import React,{useState} from 'react'
import { useLoaderData,Form,Link } from 'react-router-dom'
import { RiFileEditLine } from "react-icons/ri";
import * as XLSX from 'xlsx';
import axios from 'axios';

export async function loader() {
  
  const response = await axios.get('http://localhost:8000/admin/getsubjects');
  return { subjects: response.data.subjects}; 
}



export const action=async ({request})=>{
 
    const formData=await request.formData();
    const {extractedData} = Object.fromEntries(formData);
    const subjects = JSON.parse(extractedData);
  
    const result= await axios.post('http://localhost:8000/admin/uploadsubjects', { subjects });
    return result
    //console.log("Data uploaded successfully");
}




const SubjectsTable = () => {
  const { subjects } = useLoaderData();
  const [data, setSubjects] = useState();
    // Fonction pour gérer l'importation du fichier Excel
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      
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

  return (
    <div>
    {/* Tableau d'affichage des sujets */}
    <table className="min-w-full border border-gray-300">
      {/* Entête du tableau */}
      <thead>
        <tr>
          <th className="border-b p-2 first-letter:text-blue-400">Subject name</th>
          <th className="border-b p-2">Degree</th>
          <th className="border-b p-2">Description</th>
          <th className="border-b p-2">Actions</th>
        </tr>
      </thead>
      {/* Corps du tableau */}
      <tbody>
        {subjects.map((subject, index) => (
          <tr key={index}>
            <td className="border-b p-2">{subject.name}</td>
            <td className="border-b p-2">{subject.degree}</td>
            <td className="border-b p-2">{subject.description}</td>
            <td className="border-b p-2">
              {/* Edit button for each subject */}
              <Link to={subject._id} >
               
                <RiFileEditLine />
              
              </Link>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex mt-2 float-right flex-row">
      <div  >
        <Form className='flex justify-between' method="post">
          <label htmlFor='file-upload' className="block w-full text-sm text-slate-500">Upload Excel File</label>
          <input type="file" name='data' id='file-upload' accept=".xls, .xlsx" onChange={handleFileUpload} className=" w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold hidden
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
          <input type="hidden" name="extractedData" id="extractedData" />
          <button type='submit' className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-full">
             Save changes
          </button>
        </Form>
      </div>
    </div>
  </div>
  
  )
}

export default SubjectsTable