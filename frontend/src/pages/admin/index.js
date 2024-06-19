import Admin from "./admin";
import Subjectpage from "./Subjectpage";
import SubjectsTable from "./SubjectsTable";
import Teacherpage from "./teacherpage";
import TeachersTable from "./TeachersTable";
import {loader as subjectsLoader,action as subjectPost } from './SubjectsTable';
import {loader as subjectLoader} from './Subjectpage';
import {loader as TeacherLoader,action as TeacherAction} from './teacherpage';
import {loader as getTeachersLoader,action as teachersPost } from './TeachersTable';
export {Admin,Subjectpage,SubjectsTable,Teacherpage,TeachersTable,subjectsLoader,subjectPost,subjectLoader,TeacherLoader,TeacherAction,getTeachersLoader,teachersPost}