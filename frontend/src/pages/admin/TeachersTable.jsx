import React, { useState } from 'react';
import {
  Link,
  useLoaderData,Form} from "react-router-dom";
import axios from 'axios';
import * as XLSX from 'xlsx';




export async function loader() {
  
  const response = await axios.get('/api/admin/get');
  console.log(response);
  return { teachers: response.data.teachers};
}
export const action=async({request})=> {
  
  const formData = await request.formData();
  const {extractedData} = Object.fromEntries(formData);
  const teachers = JSON.parse(extractedData);
  console.log(teachers);
  const result = await axios.post('/api/admin/upload', { teachers });
  return result;
}


const TeachersTable = () => {
  const [data, setTeachers] = useState();
  const { teachers } = useLoaderData();

 


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
        document.getElementById('extractedData').value = JSON.stringify(data);
        console.log(data);
        
      };
      
      reader.readAsBinaryString(file);
      
    }
  };
    
  // Fonction pour gérer l'exportation des données vers un fichier Excel

  


  return (
<div className="container mx-auto p-4">
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
      <Form className="flex  " method="post">
        <label htmlFor='file-upload' className="block w-full text-sm text-slate-500">Upload Excel File</label>
        <input type="file" name='data' id='file-upload' accept=".xls, .xlsx" onChange={handleFileUpload} className=" w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold hidden
            file:bg-violet-50 file:text-blue-500
            hover:file:bg-violet-100
          "/>
        <input type="hidden" name="extractedData" id="extractedData" />
           <button type='submit' className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md">
                 Save 
            </button>
      </Form>
  </div>

</div>


  );
};

export default TeachersTable;

