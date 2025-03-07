const express = require("express");
const PlansController = require("../controllers/PlanController");

const router = express.Router();

router.post("/add", PlansController.add);
router.get("/getall", PlansController.getAll);
router.get("/getby/:id", PlansController.getById);
router.put("/update/:id", PlansController.update);
router.delete("/delete/:id", PlansController.delete);

module.exports = router;