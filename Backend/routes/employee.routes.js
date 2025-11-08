import express from "express";
import db from "../db.js";

const router = express.Router();





// Get all employees (with filter, search, sort & pagination)
router.get("/", (req, res) => {
  let { search, department, status, sort, page, limit } = req.query;

  if (status === "Inactive") {
    status = "In";
  }

  // default pagination
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = (page - 1) * limit;

  let sql = "SELECT * FROM employees WHERE 1=1";

  if (search) sql += ` AND name LIKE '%${search}%'`;
  if (department) sql += ` AND department='${department}'`;
  if (status) sql += ` AND status='${status}'`;

  if (sort === "name") sql += " ORDER BY name ASC";
  else if (sort === "salary") sql += " ORDER BY salary ASC";
  else sql += " ORDER BY id DESC";

  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//  Create new employee
router.post("/", (req, res) => {
  const { name, email, department, designation, salary, status } = req.body;
  const sql =
    "INSERT INTO employees (name, email, department, designation, salary, status) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, email, department, designation, salary, status],
    (err, data) => {
      if (err) return res.json(err);
      return res.json({ message: "✅ Employee Added Successfully" });
    }
  );
});

// Get single employee by ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM employees WHERE id=?";
  db.query(sql, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

//  Update employee
router.put("/:id", (req, res) => {
  const { name, email, department, designation, salary, status } = req.body;
  const sql =
    "UPDATE employees SET name=?, email=?, department=?, designation=?, salary=?, status=? WHERE id=?";
  db.query(
    sql,
    [name, email, department, designation, salary, status, req.params.id],
    (err) => {
      if (err) return res.json(err);
      return res.json({ message: "✅ Employee Updated Successfully" });
    }
  );
});

// Delete employee
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM employees WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.json({ message: " Employee Deleted Successfully" });
  });
});

export default router;
