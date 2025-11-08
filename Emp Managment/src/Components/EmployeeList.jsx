import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState({
    department: "",
    status: "",
    search: "",
  });

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:8081/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await axios.delete(`http://localhost:8081/employees/${id}`);
      fetchEmployees();
    }
  };

  const filtered = employees.filter((e) => {
    return (
      (filter.department === "" || e.department === filter.department) &&
      (filter.status === "" || e.status === filter.status) &&
      (filter.search === "" ||
        e.name.toLowerCase().includes(filter.search.toLowerCase()))
    );
  });

  return (
    <div>
      <h2>Employee List</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          placeholder="Search by name..."
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <select
          onChange={(e) => setFilter({ ...filter, department: e.target.value })}
        >
          <option value="">All Departments</option>
          <option>HR</option>
          <option>Engineering</option>
          <option>Marketing</option>
          <option>Sales</option>
        </select>
        <select
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>{emp.salary}</td>
              <td>{emp.status}</td>
              <td>
                <Link to={`/view/${emp.id}`}>View</Link> |{" "}
                <Link to={`/edit/${emp.id}`}>Edit</Link> |{" "}
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
