import express from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 chars")
  ],
  async (req, res) => {
    // Grab user creds from body
    const { email, password } = req.body;

    // Validation
  }
);

export { router as signUpRouter };
