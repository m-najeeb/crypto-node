const { ExpenseSchema } = require("../models/expenseModel");

class ExpenseQueries {
  async addExpense(data) {
    const expense = new ExpenseSchema(data);
    return await expense.save();
  }

  async getAllExpenses() {
    return await ExpenseSchema.find({}).lean();
  }
}

module.exports = new ExpenseQueries();
