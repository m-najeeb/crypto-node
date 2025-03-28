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

      if (!expenses.length) {
        ResponseService.status = constants.CODE.RECORD_NOT_FOUND;
        return ResponseService.responseService(
          constants.STATUS.NOT_FOUND,
          [],
          messages.NO_DATA_FOUND
        );
      }

      const decryptedExpenses = expenses.map((expense) => {
        expense.amount = parseFloat(decrypt(expense.amount));
        return expense;
      });

      // const decryptedExpenses = expenses.map((expense) => ({
      //   ...expense.toObject(),
      //   amount: parseFloat(decrypt(expense.amount))
      // })); //if we dont wanna use lean() in queries,

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

  async getExpensesByCategory(category) {
    try {
      const expenses = await ExpenseQueries.getExpensesByCategory(category);
      if (!expenses.length) {
        ResponseService.status = constants.CODE.RECORD_NOT_FOUND;
        return ResponseService.responseService(
          constants.STATUS.NOT_FOUND,
          [],
          messages.NO_EXPENSES_IN_THIS_CATEGORY
        );
      }

      const decryptedExpenses = expenses.map((expense) => {
        expense.amount = parseFloat(decrypt(expense.amount));
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

  async getExpensesByPaymentMethod(paymentMethod) {
    try {
      const expenses = await ExpenseQueries.getExpensesByPaymentMethod(
        paymentMethod
      );
      if (!expenses.length) {
        ResponseService.status = constants.CODE.RECORD_NOT_FOUND;
        return ResponseService.responseService(
          constants.STATUS.NOT_FOUND,
          [],
          messages.NO_EXPENSES_USING_THIS_PAYMENT_METHOD
        );
      }

      const decryptedExpenses = expenses.map((expense) => {
        expense.amount = parseFloat(decrypt(expense.amount));
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
