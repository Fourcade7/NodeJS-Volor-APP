const express = require("express");

const SmsController = require("../controllers/SmsController");

const router = express.Router();

router.post("/add", SmsController.add);
router.get("/getall", SmsController.getAll);
router.get("/getby/:id", SmsController.getById);
router.put("/update/:id", SmsController.update);
router.delete("/delete/:id", SmsController.delete);

module.exports = router;