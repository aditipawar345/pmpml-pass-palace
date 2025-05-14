// server.js

import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1606",
  database: "pmpml",
});

db.connect(err => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// Get all passes
app.get("/passes", (req, res) => {
  db.query("SELECT * FROM passes", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Book a pass
app.post("/book-pass", (req, res) => {
  const {
    user_name,
    aadhar_number,
    address,
    pass_id,
    booking_date,
    expiry_date
  } = req.body;

  if (!user_name || !aadhar_number || !address || !pass_id || !booking_date || !expiry_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = `
    INSERT INTO bookings 
    (user_name, aadhar_number, address, pass_id, booking_date, expiry_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [user_name, aadhar_number, address, pass_id, booking_date, expiry_date], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    res.status(201).json({
      message: "Booking successful",
      bookingId: result.insertId,
    });
  });
});

// Get all bookings ✅ Added new endpoint
app.get("/bookings", (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Basic home route
app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

