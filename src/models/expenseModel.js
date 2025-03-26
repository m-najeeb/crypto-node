const mongoose = require("mongoose");
const { category } = require("../../api/enums/categoryEnum");
const { paymentMethod } = require("../../api/enums/paymentMethodEnum");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    category: {
      type: Number,
      required: true,
      enum: [
        category.food,
        category.transport,
        category.entertainment,
        category.housing,
        category.utilities,
        category.health,
        category.education,
        category.other,
      ],
    },
    paymentMethod: {
      type: Number,
      enum: [
        paymentMethod.cash,
        paymentMethod.creditCard,
        paymentMethod.debitCard,
        paymentMethod.bankTransfer,
        paymentMethod.digitalWallet,
        paymentMethod.other,
      ],
      default: paymentMethod.other,
    },
  },
  {
    timestamps: true,
  }
);

const ExpenseSchema = mongoose.model("Expense", expenseSchema);

module.exports = { ExpenseSchema };
