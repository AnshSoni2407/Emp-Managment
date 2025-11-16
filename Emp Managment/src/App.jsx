import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddEmployee from "./Components/AddEmployee.jsx";
import ViewEmployee from "./Components/ViewEmployee.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import ManageEmployee from "./Components/ManageEmploye.jsx";
import NotFound from "./Components/NotFound.jsx";
import Testing from "./Components/Testing.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/testing" element={<Testing />} />

        <Route path="/add" element={<AddEmployee />} />
        <Route path="/manage" element={<ManageEmployee />} />
        <Route path="/view" element={<ViewEmployee />} />
        {/*  route to prevent ynwanted path */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
