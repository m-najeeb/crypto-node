const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const NotificationQueries = require("../../src/queries/notificationQueries");
const FCMService = require("../../src/services/fcmServices");

class NotificationImplementation {
  async sendNotification(data) {
    try {
      const { deviceToken, title, body } = data;
      const response = await FCMService.sendNotification(
        deviceToken,
        title,
        body
      );
      await NotificationQueries.saveNotification({
        title,
        message: body,
        recipientToken: deviceToken,
        status: "sent",
      });

      if (response) {
        ResponseService.status = constants.CODE.OK;
        return ResponseService.responseService(
          constants.STATUS.SUCCESS,
          response,
          messages.SUCCESSFULLY_SENT
        );
      }
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async getAllNotifications() {
    try {
      const notification = await NotificationQueries.getAllNotifications();

      if (!notification.length) {
        ResponseService.status = constants.CODE.RECORD_NOT_FOUND;
        return ResponseService.responseService(
          constants.STATUS.NOT_FOUND,
          [],
          messages.NO_DATA_FOUND
        );
      }

      ResponseService.status = constants.CODE.OK;
      return ResponseService.responseService(
        constants.STATUS.SUCCESS,
        notification,
        messages.DATA_FETCHED_SUCCESSFULLY
      );
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

module.exports = new NotificationImplementation();
