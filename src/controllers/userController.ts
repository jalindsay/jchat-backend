import { Request, Response } from "express";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "jchat",
  password: "password",
  port: 5432,
});

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
