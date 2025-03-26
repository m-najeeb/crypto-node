const Joi = require("joi");
class expenseValidation {
  async addExpense(data) {
    const schema = Joi.object({
      amount: Joi.number().min(0).required(),
      category: Joi.number().valid(0, 1, 2, 3, 4, 5, 6, 7).required(),
      paymentMethod: Joi.number().valid(0, 1, 2, 3, 4, 5),
    });
    return schema.validate(data);
  }
}

module.exports = new expenseValidation();
