const expenseRoutes = require("./routers/expenseRoutes");
const notificationRoutes = require("./routers/notificationRoutes");

function setup(app) {
  app.use("/api/expenses", expenseRoutes);
  app.use("/api/notifications", notificationRoutes);
}

module.exports = setup;
