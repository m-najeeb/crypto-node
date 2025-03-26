const Joi = require("joi");

class expenseValidation {
  addExpense(expenseData) {
    const schema = Joi.object({
      amount: Joi.number().positive().required(),
      category: Joi.number().valid(0, 1, 2, 3, 4, 5, 6, 7).required(),
      paymentMethod: Joi.number().valid(0, 1, 2, 3, 4, 5),
    });

    return schema.validate(expenseData, { abortEarly: false });
  }
}

module.exports = new expenseValidation();
