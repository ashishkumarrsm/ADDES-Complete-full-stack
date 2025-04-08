const { updateROIIncomeForUsers } = require('./CornJobController');
const { calculateCommissionForAllUsers } = require('./refferalController');
const { reward } = require('./rewardController');

const callAllFunctionsSequentially = async (req, res) => {
  try {
    // Call the first function
    await updateROIIncomeForUsers();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await calculateCommissionForAllUsers();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await reward();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    res.status(200).json({ message: "All functions executed successfully." });
  } catch (error) {
    console.error("Error in calling functions sequentially:", error);
    res.status(500).json({ message: "Error in executing functions.", error });
  }
};

module.exports = { callAllFunctionsSequentially };
