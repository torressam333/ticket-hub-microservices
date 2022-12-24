import express from "express";

const router = express.Router();

router.get("/api/users/currentUser", async (req, res) => {
  res.send("testing testing");
});

export { router as currentUserRouter };
