const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const admin= require("./routes/admin");
const student = require("./routes/student");
require("dotenv").config({ path: ".env" });

const PORT = process.env.PORT || 5000; // For development
// const PORT = 8183;  // For production

const { fileParser } = require("express-multipart-file-parser");

// Use the fileParser middleware
app.use(fileParser({
  rawBodyOptions: {
      limit: '10mb', // Adjust the size limit as needed
  },
  busboyOptions: {
      limits: {
          fileSize: 5 * 1024 * 1024, // 5MB file size limit
      },
  },
}));


const connectDB = require("./db/db");
connectDB();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json());
app.use(cors());

app.use("/api/admin", admin);
app.use("/api/student", student);

app.listen(PORT, console.log("Server started at " + PORT+ " and pid: "+ process.pid));