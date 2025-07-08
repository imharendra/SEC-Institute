import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
} from "@mui/material";
import axios from "axios";
import EditStudentDetails from "./EditStudentDetails";
import { ToastContainer } from "react-toastify";
import ViewStudentDetails from "./ViewStudentDetails";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleView = (student) => {
    setSelectedStudent(student);
    setViewModalOpen(true);
  };
  const handleCloseView = () => {
    setViewModalOpen(false);
    setSelectedStudent(null);
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `/api/admin/students?page=${page}&search=${search}`
      );
      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEditModal = (student) => {
    setEditStudent(student);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditStudent(null);
  };

  const handleUpdateStudent = () => {
    fetchStudents();
    handleCloseEditModal();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <ToastContainer />
      <TextField
        label="Search by Name or Enrollment"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Enrollment No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.enrollmentNumber}</TableCell>
                <TableCell>{s.studentName}</TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>{s.programName}</TableCell>
                <TableCell>{s.courseName}</TableCell>
                <TableCell>{s.isVerified ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => handleView(s)}
                  >
                    View
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{ ml: 1 } }
                    onClick={() => handleOpenEditModal(s)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {editStudent && (
        <EditStudentDetails
          open={openEditModal}
          student={editStudent}
          onClose={handleCloseEditModal}
          onUpdate={fetchStudents}
        />
      )}

      <ViewStudentDetails
        open={viewModalOpen}
        onClose={handleCloseView}
        student={selectedStudent}
      />
    </Container>
  );
}
