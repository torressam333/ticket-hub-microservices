import express from "express";

const app = express();
// Parse json from req bodies
app.use(express.json());

app.get("/api/users/currentUser", (req, res) => {
  res.send("test test test");
});

// Will eventually be replaced by kubernates
app.listen(4000, () => console.log("Auth service listening on port 4000"));
