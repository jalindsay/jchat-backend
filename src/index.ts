import express from "express";
import { getUser, listUsers, login } from "./controllers/userController";
import cors from "cors";
import { authenticateToken } from "./middleware/authMiddleware";

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// TODO: get usr by id
app.get("/user/:id", authenticateToken, getUser);

app.get("/users", authenticateToken, listUsers);

app.get("/", (req, res) => {
  return res.send("Root API endpoint hit");
});

// TODO: create user
app.post("/user");

app.post("/login", login);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
