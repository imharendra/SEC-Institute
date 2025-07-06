const Student = require("../models/Student");


exports.getProfileInfo= async (req, res) => {
  try {
    const enrollmentNumber = req.query.enrollmentNumber; // Assuming user ID is stored in req.user
    const student = await Student.findOne({
      enrollmentNumber: enrollmentNumber
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }     
}
