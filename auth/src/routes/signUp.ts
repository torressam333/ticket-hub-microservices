import express, { Request, Response } from "express";
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
  async (req: Request, res: Response) => {
    // Grab user creds from body
    const { email, password } = req.body;

    // Send potential erros back to user
  }
);

export { router as signUpRouter };
