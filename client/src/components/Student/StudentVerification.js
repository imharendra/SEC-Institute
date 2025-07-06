import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Avatar,
  Alert
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

export default function StudentVerification() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [student, setStudent] = useState(null);

  const handleVerify = async () => {
    setStudent(null);
    try {
        console.log(enrollmentNumber);
      const res = await axios.get(`/api/student/profile?enrollmentNumber=${enrollmentNumber}`);
      setStudent(res.data);
      toast.success('Student found successfully');
    } catch (err) {
      toast.error('Student not found');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
        <ToastContainer />
      <Typography variant="h5" gutterBottom>
        Student Verification
      </Typography>
      <TextField
        fullWidth
        label="enrollment Number"
        value={enrollmentNumber}
        onChange={(e) => setEnrollmentNumber(e.target.value)}
        margin="normal"
        required
      />
      <Button variant="contained" onClick={handleVerify} sx={{ mb: 2 }}>
        Verify
      </Button>

      {student && (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {student.studentProfilePicture && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Avatar
                      alt={student.studentName}
                      src={`data:image/jpeg;base64,${student.studentProfilePicture}`}
                      sx={{ width: 100, height: 100, margin: 'auto' }}
                    />
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell><strong>enrollment Number</strong></TableCell>
                <TableCell>{student.enrollmentNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Student Name</strong></TableCell>
                <TableCell>{student.studentName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Gender</strong></TableCell>
                <TableCell>{student.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Father's Name</strong></TableCell>
                <TableCell>{student.fatherName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Program Name</strong></TableCell>
                <TableCell>{student.programName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Course Name</strong></TableCell>
                <TableCell>{student.courseName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Date of Birth</strong></TableCell>
                <TableCell>{student.dateOfBirth}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Admission Date</strong></TableCell>
                <TableCell>{student.admissionDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Verified</strong></TableCell>
                <TableCell>{student.isVerified ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}