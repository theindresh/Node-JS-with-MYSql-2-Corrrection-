const db = require("../config/db");
// const bcrypt = require("bcrypt");

const apiController = {
  getData: async (req, res) => {
    try {
      const [results] = await db.query("SELECT * FROM your_table");

      // Extracting and sending only the actual data rows
      const dataRows = results.map((row) => ({
        id: row.id,
        name: row.name,
        age: row.age,
        position: row.position,
      }));

      res.json(dataRows);
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  addData: async (req, res) => {
    const { name, age, position } = req.body;

    if (!name || !age || !position) {
      return res
        .status(400)
        .json({ error: "Name, age, and position are required" });
    }

    try {
      const result = await db.query(
        "INSERT INTO your_table (name, age, position) VALUES (?, ?, ?)",
        [name, age, position]
      );
      res
        .status(201)
        .json({ message: "Data added successfully", id: result.insertId });
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getDataById: async (req, res) => {
    const { id } = req.params;

    try {
      const results = await db.query("SELECT * FROM your_table WHERE id = ?", [
        id,
      ]);
      if (results.length === 0) {
        res.status(404).json({ error: "Data not found" });
      } else {
        res.json(results[0]);
      }
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateData: async (req, res) => {
    const { id } = req.params;
    const { name, age, position } = req.body;

    if (!name || !age || !position) {
      return res
        .status(400)
        .json({ error: "Name, age, and position are required" });
    }

    try {
      await db.query(
        "UPDATE your_table SET name = ?, age = ?, position = ? WHERE id = ?",
        [name, age, position, id]
      );
      res.json({ message: "Data updated successfully" });
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteData: async (req, res) => {
    const { id } = req.params;

    try {
      await db.query("DELETE FROM your_table WHERE id = ?", [id]);
      res.json({ message: "Data deleted successfully" });
    } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = apiController;
