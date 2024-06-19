// InstructorDashboard.jsx
import React from 'react';
import { Link, Outlet,useLoaderData } from 'react-router-dom';
import axios from 'axios';



export const loader = async () => {
  const token=localStorage.getItem('token');
  const response = await axios.get(`http://localhost:8000/teacher/getTeacher`,{
    
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

      
    );
  return response.data;
}
export const action = async () => {}
const InstructorDashboard = () => {
 

const {teacher:{preference:subjects}}=useLoaderData()
console.log(subjects);

  return (
  
   <main className='h-screen'>
    <section className="bg-gray-100 h-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Subjects</h1>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background bg-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3">
            Request Subject
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {
          subjects.map((sub,index)=>(
            <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className=" text-2xl font-semibold leading-none tracking-tight">
                {sub.subject.name}
              </h3>
              <p className="text-sm text-muted-foreground">{sub.subject.description}</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
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
                    className="h-6 w-6"
                  >
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                  </svg>
                  <span>Python, Java, C++</span>
                </div>
                <Link to={`${sub.subject._id}`} className="inline-flex items-center bg-slate-300 justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  Manage
                </Link>
              </div>
            </div>
          </div>
          ))
        }
        
        
        </div>
      </div>
    </section>
   </main>
  

  
  );
};

export default InstructorDashboard;
