const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Counter = require("../models/Counter");
const sendEmail = require("../services/mailer");
const Admin = require("../models/Admin");
// const Visit = require("../models/Visitor");
// const passport = require("../services/passportAuth.js");

const getNextEnrollmentNumber = async () => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "student_enrollment" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const padded = String(counter.seq).padStart(4, "0");
  return `SECI${padded}`;
};

exports.fetchAllStudents = async (req, res) => {
  try {
    const users = await Student.find();
    res.json(users);
  } catch (error) {
    console.error("Account deletion failed:", error);
    res.status(500).json({ error: "Failed to delete the account" });
  }
};

exports.createNewStudent = async (req, res) => {
  try {
    const {
      studentName,
      gender,
      fatherName,
      programName,
      courseName,
      dateOfBirth,
      admissionDate,
      isVerified,
    } = req.body;

    const enrollmentNumber = await getNextEnrollmentNumber();

    const existingUser = await Student.findOne({ enrollmentNumber });
    if (existingUser) {
      return res.status(400).json({ message: "Student already exists" });
    }

    let profilePictureData = null;
    const profilePicture = req.files.find(
      (file) => file.fieldname === "profilePicture"
    );
    if (!profilePicture) {
      profilePictureData =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    } else {
      // Convert the file buffer to a Base64 string
      profilePictureData = profilePicture.buffer.toString("base64");
    }

    console.log("File uploaded:", profilePictureData);

    const newStudent = new Student({
      enrollmentNumber,
      studentName,
      gender,
      fatherName,
      programName,
      courseName,
      dateOfBirth,
      admissionDate,
      isVerified: isVerified || false,
      studentProfilePicture: profilePictureData,
    });

    await newStudent.save();

    const receiver = process.env.EMAIL;
    const subject = "New student registered successfully!";
    const html = `
              <div class="content">
                <h2>Hi ${receiver},</h2>
                <p>New Student has been created successfully.</p>
                <p>Please validate the below details: </p>
                <div class="student-details">
                  <p><strong>Enrollment Number:</strong> ${newStudent.enrollmentNumber}</p>
                  <p><strong>Student Name:</strong> ${newStudent.studentName}</p>
                  <p><strong>Gender:</strong> ${newStudent.gender}</p>
                  <p><strong>Father's Name:</strong> ${newStudent.fatherName}</p>
                  <p><strong>Program Name:</strong> ${newStudent.programName}</p> 
                  <p><strong>Course Name:</strong> ${newStudent.courseName}</p>
                  <p><strong>Date of Birth:</strong> ${newStudent.dateOfBirth}</p>
                  <p><strong>Admission Date:</strong> ${newStudent.admissionDate}</p>
              </div>
                `;

    // sendEmail(receiver, subject, html)
    //   .then((response) => {
    //     console.log(`Email sent to ${receiver}:`, response);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending email:", error);
    //   });

    res.status(201).json({
      message: "Student created successfully",
      enrollmentNumber: newStudent.enrollmentNumber,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Student creation failed", error: error.message });
  }
};

exports.createNewAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({
      fullName,
      userName: email.split("@")[0], // Use email prefix as username
      email,
      password: await bcrypt.hash(password, 10), // Hash the password
      isVerified: true,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log("Error creating admin:", error);
    res
      .status(500)
      .json({ message: "Admin creation failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email, fullName: admin.fullName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        userName: admin.userName,
      },
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// exports.uploadProfilePicture2 = async (req, res) => {
//   try {
//       const userId = req.query.userId;
//       console.log("UserID:", userId);

//       // Access the uploaded file from req.files
//       const profilePicture = req.files.find(file => file.fieldname === "profilePicture");

//       if (!profilePicture) {
//           return res.status(400).json({ error: "No profile picture uploaded" });
//       }

//       console.log("File uploaded:", profilePicture);

//       // Convert the file buffer to a Base64 string
//       const profilePictureData = profilePicture.buffer.toString("base64");

//       // Save the profile picture to the user's database record
//       console.log("user idddd:  ", userId);
//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({ error: "User not found" });
//       }

//       user.profilePicture = profilePictureData;
//       await user.save();

//       res.status(200).json({ message: "Profile picture uploaded successfully", user: user });
//   } catch (error) {
//       console.error("Error uploading profile picture:", error);

//       res.status(500).json({ error: "Failed to upload profile picture" });
//   }
// };
