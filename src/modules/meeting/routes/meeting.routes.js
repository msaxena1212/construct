const express = require("express");
const router = express.Router();
const meetingController = require("../controller/metting.controller");


router.post("/", meetingController.createMeeting);
router.get("/", meetingController.getAllMeetings);
router.get("/:id", meetingController.getMeetingById);
router.put("/:id", meetingController.updateMeeting);
router.delete("/:id", meetingController.deleteMeeting);

module.exports = router;