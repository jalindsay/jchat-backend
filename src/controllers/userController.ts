import { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jchat",
  password: "password",
  port: 5432,
});

const secretKey = process.env.JWT_SECRET ?? "";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Query the database to get a user
    const result = await pool.query("SELECT * FROM user_ WHERE id = $1", [
      req.params.id,
    ]);

    // Check if user exists
    if (result.rows.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    // Send user data as response
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const listUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Query the database to get a user
    const result = await pool.query("SELECT * FROM user_");

    // Check if user exists
    if (result.rows.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    // Send user data as response
    res.json(result.rows);
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log("Login request received", req.body);
  let { username, password } = req.body;

  // Strip apostrophes from the password
  password = password.replace(/'/g, "");

  try {
    const result = await pool.query("SELECT * FROM user_ WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      res.status(401).send("Invalid username or password");
      return;
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send("Invalid username or password");
      console.log("Invalid password:", password);
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
};
