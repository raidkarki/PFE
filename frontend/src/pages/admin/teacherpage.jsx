import React,{useState,useEffect} from 'react'
import { Form, useLoaderData,redirect } from 'react-router-dom'
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';



export const  loader= async({params})=>{  
    const response = await axios.get(`/api/admin/getTeacher?id=${params.teacherid}`);
    const response2 = await axios.get('/api/admin/getsubjects');
    const teacher=response.data.teacher;
    const subjectsIhave=response.data.subjectsIhave;
    const subjects=response2.data.subjects 
    const data={teacher,subjects,subjectsIhave}
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
}

export const action=async({request,params})=>{
    const formData=await request.formData();
    const teacherId=params.teacherid;
    const {data} = Object.fromEntries(formData);
    const subjects=JSON.parse(data)
    await axios.post('/api/admin/assignsubjects', { subjects,teacherId });
    return redirect(`/admin/teachers`)  
}


const Teacherpage = () => {
  const data=useLoaderData() 
   const {teacher,subjects,subjectsIhave}=data
   console.log(teacher);
   const subjectsINeed = subjects.filter(subject => subjectsIhave.indexOf(subject._id) === -1);
  const [subjectSelected,setSubjectSelected]=useState([]);
  useEffect(()=>{
    document.getElementById('data').value = JSON.stringify(subjectSelected);
  },[subjectSelected])


  const setSubjects=(event)=>{

    if(event.target.checked){
     
    setSubjectSelected((prevSelected) => [...prevSelected, event.target.id])
    }else{
      setSubjectSelected((prevSelected)=>prevSelected.filter((subject)=>subject!=event.target.id))
      
    }
  
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <div className="text-sm font-medium">Teacher</div>
      <div className="font-bold">{teacher.name+" "+teacher.secondname}</div>
    </div>
    <div className="flex flex-col gap-1">
      <div className="text-sm font-medium">Email</div>
      <div>{teacher.email}</div>
    </div>
    <div className="flex flex-col gap-1">
      <div className="text-sm font-medium">Subjects</div>
      <Form >
      <div className="grid gap-1 text-sm">
      {
        teacher.preference.map((pre,index)=>(
          <div className=' inline-flex space-x-2 ' key={index}>
          <div><button type='submit' className='text-red-500'><TiDeleteOutline /></button></div>
          <div  >{pre.subject.name}</div>
          </div>
          


        )


        )
      }
      </div>
      </Form>
    </div>
  </div>
  <Form method='post'>
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <div className="text-sm font-medium">Assign subjects to teacher</div>
      
      <div className="grid gap-2 sm:grid-cols-2">
      {
        subjectsINeed.map((subject,index)=>(
          <div key={index} className="flex items-center gap-2">
          <input type="checkbox" id={subject._id} onClick={(event)=>setSubjects(event)}   />

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
            htmlFor="mathematics"
          >
            {subject.name}
          </label>
        </div>
        )
           
        )
      }
       

      </div>
      <input type='hidden' name='data' id='data' />
    </div>
    <button type='submit' className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-slate-900 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
      Save
    </button>
  </div>
  </Form>
</div>
  )
}

export default Teacherpage