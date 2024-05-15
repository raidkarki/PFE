
import React from 'react'
import { Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const Dropdown = ({versions,setversion}) => {
    
    const ver=versions
    
    const handleClick=(e)=>{
        setversion(e.target.name)
    }
  return (
    <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      
      <img width="20" height="20" src="https://img.icons8.com/pulsar-line/48/versions.png" alt="versions"/>
        
      </Menu.Button>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      {
        ver?.map((v,index)=>(
        <div key={index} className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleClick}
                name={v}
                className={classNames(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm'
                )}
              >
               {v}
              </button>
            )}
          </Menu.Item>
         
        </div>

        ))
      }
       
       
       
      </Menu.Items>
    </Transition>
  </Menu>
  )
}

export default Dropdown