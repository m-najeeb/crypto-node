const mongoose = require("mongoose");
const { status } = require("../../api/enums/statusEnum");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    recipientToken: { type: String, required: true },
    status: {
      type: String,
      enum: [status.sent, status.faild],
      default: status.sent,
    },
  },
  { timestamps: true }
);

const NotificationSchema = mongoose.model("Notification", notificationSchema);

module.exports = { NotificationSchema };
