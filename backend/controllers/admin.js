import { Teacher,Subject,Tool,Environment } from "../database/model.js";
import {v2 as cloudinary} from 'cloudinary'
import fs from "fs";

cloudinary.config(
    {
        cloud_name: "djphukdzt",
        api_key: "292941499221955",
        api_secret: "Jsf3ewU5cBLXhcXQ0tbi1orJQaA"
    }
)

export const upload = async (req, res) => {
    const { data } = req.body;
    

    try {
        await Teacher.insertMany(data)
        res.status(201).json({ message: "Data uploaded successfully"});
    } catch (error) {   
        res.status(500).json({ error: error.message });
    }

};
export const uploadSubjects = async (req, res) => {
    const { subjects } = req.body;
    
   

    try {
        await Subject.insertMany(subjects)
        res.status(201).json({ message: "Data uploaded successfully"});
    } catch (error) {   
        res.status(500).json({ error: error.message });
    }

};
export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(201).json({teachers})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getTeacher= async (req,res)=>{
    try {
        
        const teacher = await Teacher.findById(req.query.id).populate("preference.subject").exec();
        const subjectsIhave=[]
        teacher.preference.map((pre)=>{
        subjectsIhave.push(pre.subject._id) 
        })
     
        
        res.status(200).json({ teacher,subjectsIhave });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json({ subjects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getSubject = async (req, res) => {
    try {
        const subject = await Subject.findById(req.query.id);
        res.status(200).json({ subject });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}
export const assignSubjects=async(req,res)=>{
   
      
    try {
        const {teacherId,subjects}=req.body
        const preferences = [];
        subjects.forEach(subject => {
            // Create a preference object for each subject
            const preference = {
              subject: subject, // Assuming subject._id is the ObjectId of the subject
              tools: [] // You can add tools here if needed
            };
          
            // Add the preference object to the preferences array
            preferences.push(preference);
          });
        console.log(teacherId,subjects,preferences);
        await Teacher.updateOne({_id:teacherId},{ $push: { preference: { $each: preferences } } })
        res.status(200).json({message:"Assingment succeded"})
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}
export const addTool=async(req,res)=>{

    try {
      
      
      
      const {name,description,versions}=req.body
      const imageData = fs.readFileSync(req.file.path);
      
      const base64Data = imageData.toString('base64');
      
      const response= await  cloudinary.uploader.upload(req.file.path)
     
      await Tool.create({name,description,versions,icon: response.secure_url})
      res.json({message:"i am testing"})
      
    } catch (error) {
        res.status(500).json({error:error.message})
      
    }
  
  }

        
        