const { ExpenseSchema } = require("../models/expenseModel");

class ExpenseQueries {
  async addExpense(data) {
    const expense = new ExpenseSchema(data);
    return await expense.save();
  }

  async getAllExpenses() {
    return await ExpenseSchema.find({}).lean();
  }

  async getExpensesByCategory(category) {
    return await ExpenseSchema.find({ category }).lean();
  }

  async getExpensesByPaymentMethod(paymentMethod) {
    return await ExpenseSchema.find({ paymentMethod }).lean();
  }
}

module.exports = new ExpenseQueries();
