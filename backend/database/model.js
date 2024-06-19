import mongoose from 'mongoose';

// Schéma pour les enseignants
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  secondname: { type: String, required: true },
  password: { type: String  },
  email: { type: String, required: true, unique: true },
  loggedIn: { type: Boolean, default: false },
  preference: [{
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    tools: [{ tool:{type: mongoose.Schema.Types.ObjectId, ref: 'Tool'},
    version:String
   }]
  }],
  

});
const environmentSchema= new mongoose.Schema({
  teacher:{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
  subject:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
  tools:[{name:String,version:String,description:String}]

})

teacherSchema.methods.getSubjects =function getSubjects(){
   const subjectsIhave=[]
  this.preference.map((pre)=>subjectsIhave.push(pre.subject))

  return subjectsIhave



}

// Schéma pour les outils
const toolSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  imagename:{type:String,required:true,unique:true},
  versions:[{type:String,required:true}],
  description: { type: String, required: true },
  url: { type: String  },
  icon: {type:String,required:true}
  // Ajoutez d'autres champs si nécessaire
});



// Schéma pour la relation entre les enseignants et les outils/langages choisis



const subjectSchema = new mongoose.Schema({

  name: { type: String, required: true, unique: true },
  degree: { type: String, required: true },
  description: { type: String, required: true },
  // Ajoutez d'autres champs si nécessaire
});

// Modèles MongoDB basés sur les schémas
const Teacher = mongoose.model('Teacher', teacherSchema);
const Tool = mongoose.model('Tool', toolSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Environment=mongoose.model('environment',environmentSchema)




export { Teacher, Tool,Subject,Environment };
