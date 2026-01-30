import mysql from "mysql2";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log("❌ Seed DB connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ Seed DB connected!");
});

for (let i = 0; i < 100; i++) {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const department = faker.helpers.arrayElement([
    "HR",
    "Sales",
    "IT",
    "Marketing",
  ]);
  const status = faker.helpers.arrayElement(["active", "inactive"]);
  const designation = faker.helpers.arrayElement([
    "Manager",
    "Developer",
    "Executive",
  ]);
  const salary = faker.number.int({ min: 30000, max: 80000 });

  connection.query(
    `INSERT INTO employees 
     (name, email, department, designation, salary, status) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, department, designation, salary, status],
  );
}

connection.end();
console.log(" Inserted 100 fake employees successfully!");
