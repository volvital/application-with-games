import { Router } from "express";
import controller from "../userController.js";
import { check } from "express-validator";
import cors from "cors";

const router = Router();
router.use(cors());

router.post(
  "/registration",
  [
    check("name", "Name can`t be empty").notEmpty(),
    check("password", "Password is too short").isLength({ min: 6 }),
  ],
  (req, res) => {
    controller.registration(req, res);
  }
);

router.post("/login", (req, res) => {
  console.log(123);
  controller.signIn(req, res);
});

export default router;
