import React, { useState, useEffect } from 'react';

import Dropdown from './Dropdown';
import axios from "axios"
import { useNavigate,Form } from 'react-router-dom';

const ToolCard = ({name,description,versions,icon,_id,subjectId,have}) => {
 
  const navigate = useNavigate();
const [version,setversion]=useState('')

const handleSubmit=async (e)=>{
   const {_id:teacherId}=JSON.parse(localStorage.getItem('profile'))
   if (!version) {
     return alert('Please select a version')
    
   }
 
   
  try {
    const form={version:version,toolId:_id,teacherId,subjectId}
    await axios.post('http://localhost:8000/teacher/addTool',form)
    navigate(`/Abdelmoumene/mysubjects/${subjectId}`)
    
  } catch (error) {
    
  }

}

  return (


<div className="rounded-lg border bg-card  shadow-sm w-full " data-v0-t="card">
  <div className="flex items-center  p-4">
    <div className="bg-gray-100 rounded-md p-3 ">
    <img width="50px" src={icon} />
    </div>
    <div className="flex-1 space-y-1">
      <h4 className="font-medium inline-block">{name}</h4>
      <span className='text-xs text-gray-500'>{version}</span>
     
    </div>
    {
      !have&&<Dropdown setversion={setversion} versions={versions}></Dropdown>
    }
    
  </div>
  <div className="items-center   p-6 pt-0">
  <p className="text-xs text-gray-600  dark:text-gray-400">{description}</p>
  {!have?  <button onClick={handleSubmit}   className="inline-flex items-center mt-4 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
      Add to Environment
    </button>: <button  className='mt-4 justify-end '>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
 
    </button>}
  
  
  </div>
</div>
  );
};

export default ToolCard;
