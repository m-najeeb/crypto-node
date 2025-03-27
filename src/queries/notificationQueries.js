const { NotificationSchema } = require("../models/notificationModel");

class NotificationQueries {
  async saveNotification(data) {
    const notification = new NotificationSchema(data);
    return await notification.save();
  }

  async getAllNotifications() {
    return await NotificationSchema.find().lean();
  }
}

module.exports = new NotificationQueries();
