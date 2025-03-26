const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const expenseImplementation = require("../implementation/expenseImplementation");

class ExpenseController {
  async addExpense(req, res) {
    try {
      const data = req.body;
      const response = await expenseImplementation.addExpense(data);
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

  async getAllExpenses(req, res) {}
}

module.exports = new ExpenseController();
