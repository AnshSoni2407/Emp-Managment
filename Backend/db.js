import mysql from "mysql2";

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Respect+1", 
  database: "employee_management",
});

db.connect((err) => {
  if (err) {
    console.log(" DB Connection Failed:", err);
  } else {
    console.log(" MySQL DB Connected Successfully!");
  }
});

export default db;
