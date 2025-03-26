const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const expenseValidation = require("../../src/validations/expenseValidations");
const expenseImplementation = require("../implementation/expenseImplementation");

class ExpenseController {
  async addExpense(req, res) {
    try {
      const data = req.body;
      console.log("Received Data:", data);
      // const { error, value } = expenseValidation.addExpense(data);
      // if (error) {
      //   ResponseService.status = constants.CODE.BAD_REQUEST;
      //   return res
      //     .status(ResponseService.status)
      //     .send(
      //       ResponseService.responseService(
      //         constants.STATUS.ERROR,
      //         error.details[0].message,
      //         messages.INVALID_DATA
      //       )
      //     );
      // }
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
