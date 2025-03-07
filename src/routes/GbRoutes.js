const express = require("express");


const GbController = require("../controllers/GbController");

const router = express.Router();

router.post("/add", GbController.add);
router.get("/getall", GbController.getAll);
router.get("/getby/:id", GbController.getById);
router.put("/update/:id", GbController.update);
router.delete("/delete/:id", GbController.delete);

module.exports = router;