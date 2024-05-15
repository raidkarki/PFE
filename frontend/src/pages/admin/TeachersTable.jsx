// TeachersTable.js
import React, { useState } from 'react';
import {
  Link,
  useLoaderData,} from "react-router-dom";
//import {teachers} from './teachers.json';
import axios from 'axios';
import * as XLSX from 'xlsx';
//import { Outlet } from 'react-router-dom';



export async function loader() {
  
  const response = await axios.get('http://localhost:8000/admin/get');
  console.log(response);
  return { teachers: response.data.teachers};
}


const TeachersTable = () => {
  const [data, setTeachers] = useState();
  const { teachers } = useLoaderData();

 

  // Fonction pour gérer l'importation du fichier Excel
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const wb = XLSX.read(content, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        console.log(data);
        setTeachers(data);
      };
      

      reader.readAsBinaryString(file);
    }
  };
    
  // Fonction pour gérer l'exportation des données vers un fichier Excel
  const addToDB = async() => {
    
    // Créez un nouveau classeur
  try {
    await axios.post('http://localhost:8000/admin/upload', { data });
    console.log("Data uploaded successfully");

    
  } catch (error) {
    console.log(error);

    
  }
  };
  


  return (
<div className="container mx-auto p-4">
  {/* Excel File Import Zone */}


  {/* Teachers Display Table */}
  <table className="min-w-full border border-gray-300">
    {/* Table Header */}
    <thead>
      <tr>
        <th className="border-b p-2 first-letter:text-blue-400">Name</th>
        <th className="border-b p-2">Surname</th>
        <th className="border-b p-2">Email</th>
        <th className="border-b p-2">Connection Status</th>
        {/* Add other columns based on the data you want to display */}
      </tr>
    </thead>
    {/* Table Body */}
    <tbody>
    {
      teachers?teachers.map((teacher, index) => (
        <tr key={index}>
          <td className="border-b p-2">
            <Link to={`${teacher._id}`} className="text-blue-500 hover:underline">
              {teacher.name}
            </Link>
          </td>
          <td className="border-b p-2">{teacher.secondname}</td>
          <td className="border-b p-2">{teacher.email}</td>
          <td className="border-b p-2">{teacher.loggedIn ? "Connected" : "Not connected"}</td>
          {/* Add other columns based on the data you want to display */}
        </tr>
      )):<tr>
        <td>There is no data</td>
      </tr>
    }
      
    </tbody>
  </table>
  <div className="flex mt-4">
  <input type="file" name='data' accept=".xls, .xlsx" onChange={handleFileUpload} className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-blue-500
      hover:file:bg-violet-100
    "/>
     <button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-full">
  Save changes
</button>
  </div>

</div>


  );
};

export default TeachersTable;
