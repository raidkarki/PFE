import axios from 'axios';
import { Teacher,Subject,Tool } from '../database/model.js';





export const search = async (req, res) => {
  try {
    const val = req.query.val;
    
    console.log(val);
    
    const tools = await Tool.find({name:{$regex:val,$options:'i'}}).exec();
    
    res.status(200).json({ tools });
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }
  
  
  
}
export const getTeacher= async (req,res)=>{
  try {
      const id=req.user.id
      
      const teacher = await Teacher.findOne({_id:id}).populate("preference.subject").exec();
      console.log(teacher);
   
      
      res.status(200).json({ teacher });
  } catch (error) {
      res.status(500).json({error:error.message})
  }
}
export const getSubject=async(req,res)=>{
  try {
    const subjectid=req.headers.subjectid
    console.log(subjectid);
    const subject=await Subject.findOne({_id:subjectid})
    res.status(200).json({subject})
    
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
export const addTool=async(req,res)=>{
  try {
    const teacherId=req.user.id
    const {version,toolId,subjectId}=req.body
    const teacher=await Teacher.findById(teacherId)
    teacher.preference.map((preference)=>{
      if (preference.subject==subjectId) {
        preference.tools.push({tool:toolId,version})
      }
    })
    await teacher.save()
    res.status(200).json({message:"Tool added successfully"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
//this is the middelware to send the tols i have to the client side
export const getMyTools=async(req,res)=>{
  try {
    const id=req.user.id
    const {preference}=await Teacher.findById({_id:id}).populate('preference.tools.tool').exec()
    res.status(200).json({myTools:preference})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
export const deleteTool=async(req,res)=>{
  try {
    const teacherId=req.user.id
    const {toolId,subjectId}=req.query
    console.log(toolId,subjectId);
    const teacher=await Teacher.findById(teacherId)
    teacher.preference.map((preference)=>{
     if (preference.subject==subjectId) {
       preference.tools=preference.tools.filter((tool)=>tool.tool!=toolId)
     }})
    await teacher.save()
    res.status(200).json({message:"tool deleted"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

