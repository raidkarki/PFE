
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../../components/Header'

const signout=()=>{
    localStorage.clear()
    window.location.reload()

}

export default function Dashboard() {
    
  return (
    <>
    
      <div className="">
        <Header />

    

        <Outlet />
        
      </div>
    </>
  )
}
