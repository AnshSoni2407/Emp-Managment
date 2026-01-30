import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import employeeRoutes from "./routes/employee.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

console.log(process.env.DB_USER, process.env.DB_HOST);

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
