import express from "express";

const app = express();
// Parse json from req bodies
app.use(express.json());

// Will eventually be replaced by kubernates
app.listen(4000, () => console.log("Auth service listening on port 4000"));
