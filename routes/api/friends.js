const express = require("express");

const ctrl = require("../../controllers/friends");

const router = express.Router();

router.get("/getAll", ctrl.getFriends);

module.exports = router;
