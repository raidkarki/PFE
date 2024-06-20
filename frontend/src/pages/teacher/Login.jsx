import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import SchoolIcon from '../../components/SchoolIcon';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    
    const [form, setForm] = useState({email:"",password:""})
    const [signup, setSignup] = useState({email:"",password:"",secpassword:"",name:"",secondname:""})
    const [loading, setLoading] = useState(false)
    const [mode,setMode]=useState(true)
    const navigate=useNavigate()
    const notifyFun = (message,err) => { if (err) {
      toast.error(message,{
        position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,})
      
    }else{
      toast.success(message,{
        position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,})
    
    }}


 


    const handleSubmit =async (e) => {
      e.preventDefault()
        setLoading(true)
        if(mode){

          try {
            const res = await axios.post("/api/auth/login", form);
            
    
            if (res.status === 200) {
                
                notifyFun("Login successful", false);
                localStorage.setItem("token", res.data.token);
                setTimeout(() => {navigate(`/dashboard`);}, 2000);
                
            } else {
                notifyFun(res.data.message, true);
            }
        } catch (error) {
            console.error(error);
            notifyFun(error.response.data.message, true);
            setLoading(false)
        }
             
             
            
        }else{
            if(signup.password!==signup.secpassword) notifyfun("Passwords do not match",true)
            await axios.post("http://localhost:8000/auth/register",signup)
            .then((res)=>{
            notifyFun("Signup successful",false)
            console.log(res)
            setToInitial()
            cancelCourse() 
            setMode(true)

             
            setLoading(false)
            }
            ).catch((err)=>{
                notifyFun("Contact your admin",true)
                console.log(err)
                setLoading(false)
            })
        }
      
      }
    const setToInitial=()=>{
        setForm({email:"",password:""})
        setSignup({email:"",password:"",secpassword:"",name:"",secondname:""})
    }
    const cancelCourse = () => { 
      document.getElementById("FORM").reset();
    }
  return (
    <>
    <ToastContainer
    position="top-center"
    autoClose={2000}
    
     />
      <div className="flex items-center min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="grid sm:mx-auto justify-items-center  sm:w-full sm:max-w-sm">
          <div className="flex text-center items-center">
            <SchoolIcon className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Classroom Companion</span>
          </div>
       
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

           
          <form id='FORM' className="space-y-6" onSubmit={handleSubmit}>
          
           {!mode&&
            <div className="flex  justify-between">

            <div className="flex-col">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  name
                </label>
                <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  onChange={(e)=>setSignup({...signup,name:e.target.value})}
                  onPaste={(e)=>setSignup({...signup,name:e.target.value})}
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Second name
                </label>
                <div className="mt-2">
                <input
                  id="secondname"
                  name="secondname"
                  type="secondname"
                  autoComplete="secondname"
                  onChange={(e)=>setSignup({...signup,secondname:e.target.value})}
                  onPaste={(e)=>setSignup({...signup,secondname:e.target.value})}
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
                 

            </div>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e)=>{
                    if(mode){setForm({...form,email:e.target.value})}
                    else{setSignup({...signup,email:e.target.value})}
                    }}
                    onPaste={(e)=>{
                           const pastedText = e.clipboardData.getData('text');
                           console.log(pastedText);
                           if (mode) {
                             setForm({ ...form, email: pastedText });
                           } else {
                             setSignup({ ...signup, email: pastedText });
                           }
                      }
                    }
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {
                    mode &&
                    <div className="text-sm">
                  <Link to="#" className="text-xs text-black ">
                    Forgot password?
                  </Link>
                </div>
                }
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e)=>{
                    if(mode)setForm({...form,password:e.target.value})
                    else setSignup({...signup,password:e.target.value})
                    }}
                    onPaste={(e)=>{
                      if(mode)setForm({...form,password:e.target.value})
                    else setSignup({...signup,password:e.target.value})
                    }}

                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {!mode &&  <> <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 Confirm Password
                </label>
             
                
              </div>
              <div className="mt-2">
                <input
                  id="secpassword"
                  name="secpassword"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e)=>{setSignup({...signup,secpassword:e.target.value})}}
                  onPaste={(e)=>{setSignup({...signup,secpassword:e.target.value})}}
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              </>
              }
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {!mode?"signup":"Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
          {mode?"Not a member? ":"Already a member? "}
            <button onClick={()=>{cancelCourse();setToInitial();setMode(!mode)}}  className="font-semibold leading-6 text-black  ">
              {mode?" Sign up":" Sign in"}
            </button>
          </p>
          <div className='text-center text-blue-700 underline'><Link to={"/admin"}>admin</Link></div>
        </div>
      </div>
    </>
  )
}

export default Login

