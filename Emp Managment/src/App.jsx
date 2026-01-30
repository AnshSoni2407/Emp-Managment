import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddEmployee from "./Components/AddEmployee.jsx";
import ViewEmployee from "./Components/ViewEmployee.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import ManageEmployee from "./Components/ManageEmploye.jsx";
import NotFound from "./Components/NotFound.jsx";
import Testing from "./Components/Testing.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/manage" element={<ManageEmployee />} />
          <Route path="/view" element={<ViewEmployee />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Toast lives once globally */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
