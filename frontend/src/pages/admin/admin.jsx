
import React from 'react'

import { Link, NavLink, Outlet } from 'react-router-dom'
//import  {useStateValue}  from '../contexts/context'
import Side from '../../components/Side'

const Admin = () => {
 // const {isClicked,handelclicked} = useStateValue();

//const { teachers, subjects} = isClicked;

  return (
    <div className="min-h-screen bg-gray-100 flex">

     <Side/>


      <main className="flex-1 p-8">
        <Outlet />
        
        
      </main>
    </div>
  );
};

export default Admin;
