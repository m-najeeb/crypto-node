const expenseRoutes = require("./routers/expenseRoutes");

function setup(app) {
  app.use("/api/expenses", expenseRoutes);
}

module.exports = setup;
