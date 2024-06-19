
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import teacherRoutes from "./routes/teacher.js";
import coreRoutes from "./routes/core.js";
import bodyParser from "body-parser";
//import multer from "multer"
//body parser middleware to parse the request body and convert it to json format 



dotenv.config();




import run from "./database/connect.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));

//app.use(multer().any());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
 app.use("/auth",authRoutes)
 app.use("/api/admin",adminRoutes)
 app.use("/api/teacher",teacherRoutes)
 app.use("/core",coreRoutes)


app.listen(8000, () => {
  console.log("server listening on port 8000");
 
  // connect to the database
  run();
});
