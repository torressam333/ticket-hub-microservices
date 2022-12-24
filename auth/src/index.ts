import express from "express";
import { currentUserRouter } from "./routes/currentUser";

const app = express();
// Parse json from req bodies
app.use(express.json());

// Use imported route handlers
app.use(currentUserRouter);

// Will eventually be replaced by kubernates
app.listen(4000, () => console.log("Auth service listening on port 4000"));
