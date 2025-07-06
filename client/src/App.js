import logo from "./logo.svg";
import "./App.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import RegisterStudent from "./components/RegisterStudent";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewAllStudents from "./components/ViewAllStudents";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/styles/style.css";
import StudentVerification from "./components/Student/StudentVerification";


function App() {
  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/registerstudent" element={<RegisterStudent />} exact />
          <Route path="/viewstudents" element={<ViewAllStudents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/studentverify" element={<StudentVerification />} />
          {/* <Route path="/studentverify" element={<StudentVerification />} /> */}
          
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
