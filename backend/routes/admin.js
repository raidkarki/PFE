
import { Router } from "express";
import { upload,getTeachers,getSubjects,uploadSubjects,getSubject,getTeacher,assignSubjects, addTool } from "../controllers/admin.js";
import multer from "multer"
const upload1 = multer({ dest: 'uploads/' })
const router = Router();

router.post("/upload", upload);
router.post("/uploadsubjects",uploadSubjects)
router.get("/getsubject",getSubject );
router.get("/getsubjects",getSubjects)
router.get("/get",getTeachers );
router.get("/getTeacher",getTeacher );
router.post("/assignsubjects",assignSubjects)
router.post("/addtool",upload1.single('icon'),addTool)
export default router;