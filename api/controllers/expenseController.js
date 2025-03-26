const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const expenseImplementation = require("../implementation/expenseImplementation");
const expenseValidation = require("../../src/validations/expenseValidations");

class ExpenseController {
  async addExpense(req, res) {
    try {
      const data = req.body;
      const { error, value } = expenseValidation.addExpense(data);
      if (error) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return res
          .status(ResponseService.status)
          .send(
            ResponseService.responseService(
              constants.STATUS.ERROR,
              error.details[0].message,
              messages.INVALID_DATA
            )
          );
      }
      const response = await expenseImplementation.addExpense(value);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async getAllExpenses(req, res) {
    try {
      const response = await expenseImplementation.getAllExpenses();
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async getExpensesByCategory(req, res) {
    try {
      const { category } = req.params;
      const response = await expenseImplementation.getExpensesByCategory(
        category
      );
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async getExpensesByPaymentMethod(req, res) {
    try {
      const { paymentMethod } = req.params;
      const response = await expenseImplementation.getExpensesByPaymentMethod(
        paymentMethod
      );
      res.status(ResponseService.status).send(response);
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

module.exports = new ExpenseController();
