
import Landing from './routes/Landing';
import {Login,Dashboard,Subjectpage as ModuleEnvironmentPage,
       Overview,mysubjectLoader,addtoolAction,
          subjectLoader2} from './pages/teacher'
import {Admin,Subjectpage,SubjectsTable,Teacherpage,
  TeachersTable,subjectsLoader,subjectPost,subjectLoader,
  TeacherLoader,TeacherAction,getTeachersLoader,teachersPost} from './pages/admin'

import {createBrowserRouter,RouterProvider} from 'react-router-dom';

import './index.css'
const router = createBrowserRouter([
  //root
  {
    path: "/",
    element: <Landing />, 
  },
  {
    path: "/auth",
    element: <Login />,
  },{
    
  },

  //this is dashboard route
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      {
        path: "mysubjects",
        element: <Overview/>,
        id:"sub",
        loader:mysubjectLoader,   

      },
      {
        path:"mysubjects/:subjectid",
        element:<ModuleEnvironmentPage/>,
        loader:subjectLoader2,
        action:addtoolAction
      }
    ],
    
  }
  ,
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "teachers",
        element: <TeachersTable />,
        loader: getTeachersLoader,
        action:teachersPost,
      
        
      },
      
      {
        path: "subjects",
        element: <SubjectsTable />,
        loader: subjectsLoader,
        action:subjectPost,
        
      
        
      },
      {
        
          path: "subjects/:subjectid",
          element: <Subjectpage />,
          loader:subjectLoader,
          action:subjectPost,
          
        
      },
      {
        path: "teachers/:teacherid",
        element: <Teacherpage />, 
        loader:TeacherLoader,
        action:TeacherAction
        
      }
      
    ],
    
  }
  
]);



function App() {
  

  return  <RouterProvider router={router} />
   
  
}

export default App
