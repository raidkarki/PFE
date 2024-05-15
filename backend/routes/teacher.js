// Initilizing express router
import express from "express";
import { search,getTeacher,getSubject,addTool,getMyTools } from "../controllers/teacher.js";
const Router = express.Router();



Router.get("/search",search );
Router.get("/getTeacher",getTeacher)
Router.get("/getSubject",getSubject)
Router.get("/getmytools",getMyTools)
//Post routes
Router.post("/addTool",addTool)
// Exporting router



export default Router;

