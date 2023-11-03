const express = require("express");
const subscribe = require("./controller");
const router = express.Router();


router.post("/subscriber",subscribe.subscriber);

module.exports = router;
