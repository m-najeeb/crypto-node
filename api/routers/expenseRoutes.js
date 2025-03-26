const { Router } = require("express");
const expenseController = require("../controllers/expenseController");

const router = Router();

router.post("/add-expense", expenseController.addExpense);
router.get("/get-all-expenses", expenseController.getAllExpenses);

module.exports = router;
