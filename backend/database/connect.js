// create a connection to our MongoDB database


import mongoose from 'mongoose'; 

const uri = `mongodb+srv://karkiraid35:${process.env.DB_SECRET_KEY}@base.a3ofacs.mongodb.net/?retryWrites=true&w=majority`;
const mongolocal="mongodb://127.0.0.1:27017/PFE"
const mongoIncontainer="mongodb://mongo:27017/PFE"

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() { 
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
     //await mongoose.connect(uri, clientOptions).catch(error => handleError(error));
     await mongoose.connect(mongoIncontainer,{ useNewUrlParser: true, useUnifiedTopology: true })
    
    
    //await mongoose.connection.db.admin().command({ ping: 1 });  
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}
//this is the function that will be called in the index.js file






export default run;
