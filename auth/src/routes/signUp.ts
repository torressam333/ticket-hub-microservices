import express from "express";

const router = express.Router();

router.post("/api/users/signup", async (req, res) => {
  // Grab user creds from body
  const { email, password } = req.body;

  // Validation
});

export { router as signUpRouter };
