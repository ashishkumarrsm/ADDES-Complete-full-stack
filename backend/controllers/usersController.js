const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
const asyncHandler = require("express-async-handler");

dotenv.config({ path: "backend/config/config.env" });

exports.getListOfUsers = catchAsyncErrors(async (request, response, next) => {
  let sql = `SELECT u.*, r.fullname AS referred_by_name,r.email AS referred_by_email
  FROM users u
  LEFT JOIN users r ON u.reffer_by = r.refferal_code;`
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return next(new ErrorHandler("Error fetching users!", 500));
    }
    if (result.length > 0) {
      return response.status(200).json({ allusers: result });
    } else {
      return response.status(404).json({ allusers: [] });
    }
  });
});

exports.getUsersById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let sql = `SELECT * FROM users where id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }
    res.status(200).json({ success: true, singleuser: result[0] });
  });
});
exports.getUsersByEmail = asyncHandler(async (req, res, next) => {
  const  {email} = req.query;
  let sql = `SELECT * FROM users where email='${email}' OR refferal_code='${email}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }
    res.status(200).json({ success: true, emailuser: result[0] });
  });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const updatedFields = req.body;
  const { id } = req.params;
  const updateFieldsString = Object.keys(updatedFields)
    .map((key) => `${key}="${updatedFields[key]}"`)
    .join(", ");

  const sql = `UPDATE users SET ${updateFieldsString} WHERE id = ${Number(
    id
  )};`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during update:", err);
      next(new ErrorHandler("Error during update", 500));
    }

    if (result?.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Update successful" });
    } else {
      next(new ErrorHandler("User not found or no changes applied", 404));
    }
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler("user number (ID) is required", 400));
  }

  const sql = `DELETE FROM users WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler("USer not found or no changes applied", 404)
      );
    }
  });
});

exports.getrewardList = catchAsyncErrors(async (request, response, next) => {
  console.log("chekkkk")
  let sql = `SELECT reward,reward_level,email,username FROM users where reward_level > 0 ;`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return next(new ErrorHandler("Error fetching users!", 500));
    }
    if (result.length > 0) {
      return response.status(200).json({ allrewards: result });
    } else {
      return response.status(200).json({ allrewards: [] });
    }
  });
});


exports.getAdminTotalEarnings = catchAsyncErrors(async (request, response, next) => {
  const { 
      fromDate, 
      toDate, 
      transactionType, 
      minAmount, 
      maxAmount, 
      status 
  } = request.query;

  // Base SQL query for admin total earnings
  let sql = `
      SELECT 
          COUNT(*) AS total_transactions,
          SUM(amount) AS total_earnings,
          AVG(amount) AS average_transaction,
          
          SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) AS completed_earnings,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_transactions,
          
          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending_earnings,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending_transactions,
          
          SUM(CASE WHEN status = 'failed' THEN amount ELSE 0 END) AS failed_earnings,
          COUNT(CASE WHEN status = 'failed' THEN 1 END) AS failed_transactions,
          
          COUNT(DISTINCT userby_id) AS unique_senders,
          COUNT(DISTINCT userto_id) AS unique_receivers
      FROM 
          topup
      WHERE 
          1=1
  `;

  // Prepare query parameters
  const queryParams = [];
  const conditions = [];

  // Add date range filter
  if (fromDate) {
      conditions.push('createdAT >= ?');
      queryParams.push(fromDate);
  }

  if (toDate) {
      conditions.push('createdAT <= ?');
      queryParams.push(toDate);
  }

  // Add amount range filter
  if (minAmount) {
      conditions.push('amount >= ?');
      queryParams.push(parseFloat(minAmount));
  }

  if (maxAmount) {
      conditions.push('amount <= ?');
      queryParams.push(parseFloat(maxAmount));
  }

  // Add transaction type filter
  if (transactionType === 'sent') {
      conditions.push('userby_id IS NOT NULL');
  } else if (transactionType === 'received') {
      conditions.push('userto_id IS NOT NULL');
  }

  // Add status filter
  if (status) {
      conditions.push('status = ?');
      queryParams.push(status);
  }

  // Append conditions to SQL
  if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ');
  }

  // Execute the query
  db.query(sql, queryParams, (err, result) => {
      if (err) {
          console.error("Error fetching admin total earnings:", err);
          return next(new ErrorHandler("Error fetching admin total earnings!", 500));
      }

      // If no results found
      if (result.length === 0) {
          return response.status(404).json({
              message: "No transactions found",
              earnings: {
                  total_earnings: 0,
                  total_transactions: 0,
                  average_transaction: 0,
                  unique_senders: 0,
                  unique_receivers: 0
              }
          });
      }

      // Detailed earnings breakdown
      const earningsData = result[0];

      // Fetch top transactions for additional context
      let topTransactionsSql = `
          SELECT 
              id, 
              userby_id, 
              userto_id, 
              amount, 
              status, 
              createdAT
          FROM 
              topup
          WHERE 
              1=1
      `;

      // Reuse previous conditions
      if (conditions.length > 0) {
          topTransactionsSql += ' AND ' + conditions.join(' AND ');
      }

      topTransactionsSql += ` 
          ORDER BY amount DESC 
          LIMIT 10
      `;

      db.query(topTransactionsSql, queryParams, (topErr, topTransactions) => {
          if (topErr) {
              console.error("Error fetching top transactions:", topErr);
              topTransactions = [];
          }

          // Prepare comprehensive response
          return response.status(200).json({
              earnings: {
                  total_earnings: parseFloat(Number(earningsData.total_earnings).toFixed(2)),
                  total_transactions: earningsData.total_transactions,
                  average_transaction: parseFloat(Number(earningsData.average_transaction).toFixed(2)),
                  unique_senders: earningsData.unique_senders,
                  unique_receivers: earningsData.unique_receivers
              },
              status_breakdown: {
                  completed: {
                      amount: parseFloat(Number(earningsData.completed_earnings).toFixed(2)),
                      count: earningsData.completed_transactions
                  },
                  pending: {
                      amount: parseFloat(Number(earningsData.pending_earnings).toFixed(2)),
                      count: earningsData.pending_transactions
                  },
                  failed: {
                      amount: parseFloat(Number(earningsData.failed_earnings).toFixed(2)),
                      count: earningsData.failed_transactions
                  }
              },
              top_transactions: topTransactions
          });
      });
  });
});

exports.getEarningsTrend = catchAsyncErrors(async (request, response, next) => {
  const { 
      fromDate, 
      toDate, 
      groupBy = 'daily' 
  } = request.query;

  // Determine grouping interval
  let dateFormat, groupByClause;
  switch (groupBy) {
      case 'monthly':
          dateFormat = '%Y-%m';
          groupByClause = 'DATE_FORMAT(createdAT, "%Y-%m")';
          break;
      case 'yearly':
          dateFormat = '%Y';
          groupByClause = 'YEAR(createdAT)';
          break;
      default: // daily
          dateFormat = '%Y-%m-%d';
          groupByClause = 'DATE(createdAT)';
  }

  let sql = `
      SELECT 
          ${groupByClause} AS period,
          SUM(amount) AS total_earnings,
          COUNT(*) AS total_transactions,
          AVG(amount) AS average_transaction
      FROM 
          topup
      WHERE 
          status = 'completed'
  `;

  // Prepare query parameters
  const queryParams = [];
  const conditions = [];

  // Add date range filter
  if (fromDate) {
      conditions.push('createdAT >= ?');
      queryParams.push(fromDate);
  }

  if (toDate) {
      conditions.push('createdAT <= ?');
      queryParams.push(toDate);
  }

  // Append conditions to SQL
  if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ');
  }

  // Group and order results
  sql += `
      GROUP BY period
      ORDER BY period
  `;

  // Execute the query
  db.query(sql, queryParams, (err, result) => {
      if (err) {
          console.error("Error fetching earnings trend:", err);
          return next(new ErrorHandler("Error fetching earnings trend!", 500));
      }

      // If no results found
      if (result.length === 0) {
          return response.status(404).json({
              message: "No earnings data found",
              trend: []
          });
      }

      // Format results
      const formattedTrend = result.map(item => ({
          period: item.period,
          total_earnings: parseFloat(item.total_earnings.toFixed(2)),
          total_transactions: item.total_transactions,
          average_transaction: parseFloat(item.average_transaction.toFixed(2))
      }));

      return response.status(200).json({
          trend: formattedTrend
      });
  });
});

