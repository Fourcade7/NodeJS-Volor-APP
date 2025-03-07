const express = require("express");


const PhoneController = require("../controllers/PhoneController");

const router = express.Router();

router.post("/add", PhoneController.add);
router.get("/getall", PhoneController.getAll);
router.get("/getby/:id", PhoneController.getById);
router.put("/update/:id", PhoneController.update);
router.delete("/delete/:id", PhoneController.delete);

module.exports = router;