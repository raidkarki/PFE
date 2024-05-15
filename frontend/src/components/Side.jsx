import React from 'react'
import { NavLink,Link } from 'react-router-dom'
const links = [
  { name: 'Teachers', href: 'teachers' },
  { name: 'Subjects', href: 'subjects' },
  

  // Add more links as needed
];
const signOut = () => {
  localStorage.clear();
  window.location.href = '/';
};
const Side = () => {
  return (
<div className='bg-gray-800  relative '>
  <div className="w-64 text-white p-4">
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    </div>
    <div className='flex-col h-full justify-between'>
      <nav className="ml-2">
        <ul>
          {links.map((link) => (
            <li key={link.name} className="mb-2">
              <NavLink
                to={link.href}
                onClick={() => handleClicked((prev) => !prev)}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center bg-gray-700 text-white py-2 px-4 rounded'
                    : 'flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded transition duration-300'
                }
              >
                <span className="mr-2">{link.icon}</span>
                <span className="">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
  <div className="absolute  bottom-0 p-4 w-full">
    <button
      onClick={signOut}
      className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded w-full"
    >
      Sign Out
    </button>
  </div>
</div>





  )
}

export default Side