import axios from 'axios';
import { Teacher,Subject,Tool } from '../database/model.js';




export const search2 = async (req, res) => {
    const val = req.params.val;
    
    const dockerToken = req.headers.authorization
    
    var options = { 
        method: 'GET',
        url: `https://hub.docker.com/v2/namespaces/library/repositories/openjdk`,
        headers: {
          Authorization: `Bearer ${dockerToken}`,
        }
      };

   
    
    try {

        const result=await axios.request(options)
        
        res.status(200).json(result.data.results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}
export const search = async (req, res) => {
  try {
    const val = req.query.val;
    
    
    
    const tools = await Tool.find({name:{$regex:val,$options:'i'}}).exec();
    
    res.status(200).json({ tools });
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }
  
  
  
}
export const getTeacher= async (req,res)=>{
  try {
      const name=req.query.name
      
      const teacher = await Teacher.findOne({name}).populate("preference.subject").exec();
      console.log(teacher);
   
      
      res.status(200).json({ teacher });
  } catch (error) {
      res.status(500).json({error:error.message})
  }
}
export const getSubject=async(req,res)=>{
  try {
    const subjectid=req.query.id
    const subject=await Subject.findOne({_id:subjectid})
    res.status(200).json({subject})
    
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
export const addTool=async(req,res)=>{
  try {
  
    const {version,toolId,teacherId,subjectId}=req.body
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
    const id=req.query.id
    const {preference}=await Teacher.findById({_id:id}).populate('preference.tools.tool').exec()
    res.status(200).json({myTools:preference})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
export const deleteTool=async(req,res)=>{
  try {
    const {teacherId,toolId,subjectId}=req.body

    const teacher=await Teacher.findById(teacherId)
    teacher.preference.filter((pre)=>pre.tools.tool!=toolId)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

