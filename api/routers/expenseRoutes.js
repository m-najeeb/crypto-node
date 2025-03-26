const { Router } = require("express");
const expenseController = require("../controllers/expenseController");

const router = Router();

router.post("/add-expense", expenseController.addExpense);
router.get("/get-all-expenses", expenseController.getAllExpenses);
router.get("/category/:category", expenseController.getExpensesByCategory);
router.get(
  "/payment-method/:paymentMethod",
  expenseController.getExpensesByPaymentMethod
);

module.exports = router;
