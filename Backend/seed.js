import mysql from "mysql2";
import { faker } from "@faker-js/faker";

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Respect+1",

  database: "employee_management",
});

connection.connect();

for (let i = 0; i < 100; i++) {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const department = faker.helpers.arrayElement([
    "HR",
    "Sales",
    "IT",
    "Marketing",
  ]);
  const status = faker.helpers.arrayElement(["Active", "Inactive"]);
  const designation = faker.helpers.arrayElement([
    "Manager",
    "Developer",
    "Executive",
  ]);
  const salary = faker.number.int({ min: 30000, max: 80000 });

  connection.query(
    "INSERT INTO employees (name, email, department, designation, salary, status) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, department, designation, salary, status]
  );
}

connection.end();
console.log(" Inserted 100 fake employees successfully!");
