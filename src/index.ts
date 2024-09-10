import express from "express";
import { getUser, listUsers, login } from "./controllers/userController";

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// TODO: get usr by id
app.get("/user", getUser);

app.get("/users", listUsers);

app.get("/", (req, res) => {
  return res.send("Root API endpoint hit");
});

// TODO: create user
app.post("/user");

app.post("/login", login);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
