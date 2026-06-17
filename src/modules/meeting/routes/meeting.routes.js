const express = require("express");
const router = express.Router();
const meetingController = require("../controller/metting.controller");
const checkPermission = require("../../../core/middleware/permission.middleware");

router.post("/", checkPermission("calendar", "can_create"), meetingController.createMeeting);

router.get("/", checkPermission("calendar", "can_read"), meetingController.getAllMeetings);

router.get("/:id", checkPermission("calendar", "can_read"), meetingController.getMeetingById);

router.put("/:id", checkPermission("calendar", "can_update"),meetingController.updateMeeting);

router.delete("/:id", checkPermission("calendar", "can_delete"), meetingController.deleteMeeting);

module.exports = router;