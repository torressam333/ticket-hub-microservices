import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 4 and 20 chars")
  ],
  async (req: Request, res: Response) => {
    // May contain errors
    const errors = validationResult(req);

    // Send potential erros in response
    if (!errors.isEmpty()) return res.status(400).send(errors.array());

    // Grab user creds from body
    const { email, password } = req.body;

    console.log("creating user....");

    res.send({});
  }
);

export { router as signUpRouter };
