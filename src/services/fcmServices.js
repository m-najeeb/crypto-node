const admin = require("firebase-admin");
const serviceAccount = require("../../node-notify-aa665-firebase-adminsdk-fbsvc-af7df524c5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class FCMService {
  async sendNotification(deviceToken, title, body) {
    const message = {
      token: deviceToken,
      notification: { title, body },
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Notification Sent:", response);
      return response;
    } catch (error) {
      console.error("FCM Error:", error);
      throw new Error("FCM Notification Failed");
    }
  }
}

module.exports = new FCMService();
