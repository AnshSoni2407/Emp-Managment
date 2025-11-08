import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import employeeRoutes from "./routes/employee.routes.js"; 

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/employees", employeeRoutes);

app.listen(8081, () => {
  console.log("✅ Server running on port 8081");
});
