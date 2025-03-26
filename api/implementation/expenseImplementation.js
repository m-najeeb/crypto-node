const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const ExpenseQueries = require("../../src/queries/expenseQueries");
const { encrypt, decrypt } = require("../../src/middleware/crypto");

class ExpenseImplementation {
  async addExpense(data) {
    try {
      data.amount = encrypt(data.amount);
      const response = await ExpenseQueries.addExpense(data);
      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.SUCCESSFULLY_ADDED
        );
      }
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async getAllExpenses() {
    try {
      const expenses = await ExpenseQueries.getAllExpenses();

      const decryptedExpenses = expenses.map((expense) => {
        expense.amount = Number(decrypt(expense.amount));
        return expense;
      });

      ResponseService.status = constants.CODE.OK;
      return ResponseService.responseService(
        constants.STATUS.SUCCESS,
        decryptedExpenses,
        messages.DATA_FETCHED_SUCCESSFULLY
      );
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }
}

module.exports = new ExpenseImplementation();
