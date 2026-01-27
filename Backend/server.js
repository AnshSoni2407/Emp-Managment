import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import employeeRoutes from "./routes/employee.routes.js";
import dotenv from 'dotenv' 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log("✅ Server running on port 8081");
});
