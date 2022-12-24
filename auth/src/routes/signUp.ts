import express from "express";

const router = express.Router();

router.post("/api/users/signUp", async (req, res) => {
  res.send("you have been signed up");
});

export { router as signUpRouter };
