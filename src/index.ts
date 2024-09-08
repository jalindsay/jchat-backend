import express from "express";
import { getUser, listUsers } from "./controllers/userController";

const app = express();
const port = 3000;

app.get("/user", getUser);

app.get("/users", listUsers);

app.get("/", (req, res) => {
  return res.send("Root API endpoint hit");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
