const { Router } = require("express");
const NotificationController = require("../controllers/notificationController");

const router = Router();

router.post("/send", NotificationController.sendNotification);
router.get("/all", NotificationController.getAllNotifications);

module.exports = router;
