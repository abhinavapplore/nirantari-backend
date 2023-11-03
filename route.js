const express = require("express");
const subscribe = require("./controller");
const router = express.Router();


router.post("/subscriber",subscribe.subscriber);

router.get("/healthCheck",(req, res) => {

    console.log('hi ama health');
    return res.status(200).json({
        message:"health ok serivce urn"
    })
});

module.exports = router;
