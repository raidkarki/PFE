// /server/services/dataService.js
import {Teacher,Subject,Tool} from '../database/model.js';


const getTeachersWithPreferences = async () => {
  try {
    return await Teacher.find({name:"Abdelmoumene"}).populate({
      path: 'preference.subject',
      model: Subject
    }).populate({
      path: 'preference.tools.tool',
      model: Tool
    });
  } catch (err) {
    throw new Error('Error retrieving teachers with preferences');
  }
};


export default  getTeachersWithPreferences ;