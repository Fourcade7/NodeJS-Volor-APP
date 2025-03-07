const express = require("express");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/users", AuthController.getAll);
router.get("/getby/:id", AuthController.getById);
router.get("/getbyph/:phone", AuthController.getByPhone);
router.put("/update/:id", AuthController.update);

router.put("/updatefull/:id", AuthController.updateFull);
router.put("/updateplan/:id", AuthController.updatePlan);
router.put("/updategb/:id", AuthController.updateGb);
router.put("/updatesms/:id", AuthController.updateSms);
router.put("/updatephone/:id", AuthController.updatePhone);

router.delete("/delete/:id", AuthController.delete);

module.exports = router;
