// const { salary } = require('./salaryController');
// const { payCtoMonthly } = require('./ctoController');
// const { reward } = require('./rewardController');

// const callAllFunctionsSalray = async (req, res) => {
//   try {
//     // Call the first function
//     await salary();
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//     await payCtoMonthly();
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//     res.status(200).json({ message: "All functions executed successfully." });
//   } catch (error) {
//     console.error("Error in calling functions sequentially:", error);
//     res.status(500).json({ message: "Error in executing functions.", error });
//   }
// };

// module.exports = { callAllFunctionsSalray };



// const { salary } = require('./salaryController');
// const { payCtoMonthly } = require('./ctoController');
// const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");

// const callAllFunctionsSalray =catchAsyncErrors(async (req, res, next) => {
//   try {
//     // Call the first function with req and res
//     await salary(req, res, next);
//     await new Promise((resolve) => setTimeout(resolve, 5000));

//     // Call the second function, ensuring it does not require req and res
//     await payCtoMonthly(req, res, next);
//     await new Promise((resolve) => setTimeout(resolve, 5000));

//     // Send success response only if res hasn't already been sent
   
//       res.status(200).json({ message: "All functions executed successfully." });
   
//   } catch (error) {
//     console.error("Error in calling functions sequentially:", error);
    
//     // Send error response only if res hasn't already been sent
    
//       res.status(500).json({ message: "Error in executing functions.", error });

//   }
// })

// module.exports = { callAllFunctionsSalray };
const { salary } = require("./salaryController");
const { payCtoMonthly } = require("./ctoController");

const callAllFunctionsSalray = async (req, res) => {
  try {
    // console.log("Executing salary calculation...");
    
    // Run salary function (ensure it doesn't send a response if used inside this controller)
    await salary();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("first")
    // console.log("Executing CTO payment...");
    await payCtoMonthly();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("secdnt")
    // Send success response if no response has been sent yet
    res.status(200).json({ message: "All functions executed successfully." });

  } catch (error) {
      res.status(500).json({ message: "Error in executing functions.", error });
  }
};

module.exports = { callAllFunctionsSalray };
 