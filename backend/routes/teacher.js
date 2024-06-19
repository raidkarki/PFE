// Initilizing express router
import express from "express";
import { search,getTeacher,getSubject,addTool,getMyTools,deleteTool } from "../controllers/teacher.js";
import { getteacherMiddleware } from "../middleware/middleware.js";
const Router = express.Router();



Router.get("/search",getteacherMiddleware,search );
Router.get("/getTeacher",getteacherMiddleware,getTeacher)
Router.get("/getSubject",getteacherMiddleware,getSubject)
Router.get("/getmytools",getteacherMiddleware,getMyTools)
//Post routes
Router.post("/addTool",getteacherMiddleware,addTool)


Router.delete("/deleteTool",getteacherMiddleware,deleteTool)
// Exporting router



export default Router;

