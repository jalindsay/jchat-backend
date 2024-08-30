import express from "express";
import { getUser } from "./controllers/userController";

const app = express();
const port = 3000;

app.get("/user", getUser);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
