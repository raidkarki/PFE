// ModuleEnvironmentPage.jsx
import React, { useState } from 'react';
import ToolCard from '../../components/Toolcard'; // Make sure you have ToolCard component
import { Form, useLoaderData,redirect,useActionData,useMatches,useRouteLoaderData  } from 'react-router-dom';
import axios from 'axios';

export const loader = async ({params,request}) => {
  const user=JSON.parse(localStorage.getItem('profile'))
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  let searchResult={data:{tools:[]}}
  const response=await axios.get(`http://localhost:8000/teacher/getSubject?id=${params.subjectid}`);
  const {data:{myTools}}=await axios.get(`http://localhost:8000/teacher/getmytools?id=${user._id}`)
  if (q) {
    searchResult=await axios.get(`http://localhost:8000/teacher/search`,{params:{val:q}});
  }
  
  
  const data={response,searchResult,myTools}

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
  
}
export const action=async({request})=>{

}
const ModuleEnvironmentPage = () => {
  const data = useRouteLoaderData("sub");
 
  const { response: { data: {subject:subject} },searchResult:{data:{tools}},myTools } = useLoaderData();
  console.log(myTools);
  const preferenceNeed=myTools.filter((tool)=>tool.subject===subject._id)
  console.log(preferenceNeed);
  const toolsIhave=preferenceNeed[0].tools
  console.log(toolsIhave);

  const handleTest=()=>{
    console.log("test");
  
  }


  return (
<main className=''>
  <section className="bg-gray-100 h-full py-8 md:py-12 lg:py-16">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{subject.name}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
          <Form role="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              className="flex h-10 w-full bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              placeholder="Search tools..."
              type="search"
              name="q"
            />
            </Form>
          </div>
          <button onClick={handleTest} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3">
            Save 
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            View environment
          </button>
        </div>
      </div>
    <div className='gap-4'>
    {
      tools.length>0 &&(
        <div className=''>
        <span>Search result</span> 
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10'>
          {
            tools.map((tool,index)=>(
              
              
              <ToolCard key={tool._id}  subjectId={subject._id}  {...tool}></ToolCard>
            ))
          }

        </div>
           

        </div>
      )
    }


    <div>
    {
      toolsIhave.length>0?<span>Tools you have</span>:<span>you have not tools yet</span>
    }
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
     {
      toolsIhave.map((myTool,index)=>(
        <ToolCard key={index} have {...myTool.tool}></ToolCard>
      ))
     }
      </div>
    </div>  
      </div>
      
    </div>
  </section>
</main>

  );
};

export default ModuleEnvironmentPage;

