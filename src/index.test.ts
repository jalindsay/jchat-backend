import request from "supertest";
import express from "express";
import { login } from "./controllers/userController";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", login);

describe("POST /login", () => {
  // TODO: request not exiting properly
  it("should return a JWT token for valid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "root",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "invalid_username",
      password: "invalid_password",
    });

    expect(response.status).toBe(401);
  });
});
