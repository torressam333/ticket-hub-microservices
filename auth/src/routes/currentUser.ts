import express from "express";

const router = express.Router();

router.get("/api/users/currentUser", async (req, res) => {});

export { router as currentUserRouter };
