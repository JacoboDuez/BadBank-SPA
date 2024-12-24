// const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';

const { Server } = require('http');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { resolve } = require('path');

const uri = "mongodb+srv://jacoboduez:node1234@badbankcluster.j9kohye.mongodb.net/?retryWrites=true&w=majority&appName=BadBankCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {useUnifiedTopology:true},{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//independently of whichever function is called I will connect to MONGO DB to perform any query

let db;

async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connectionnp
    await client.db("BadBank").command({ ping: 1 });
    db = client.db("BadBank");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(error){
    console.log(error);
    console.log("The connection could not be achieved");
  }
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
}
connect().catch(console.dir);



// create user account
function create(name, email, password){
    return new Promise((resolve,reject)=>{
        const customers =  db.collection('users');
        const doc =  {name,email,password,balance:0};
        customers.insertOne(doc,{w:2},(err,doc)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(doc);
            }
        });
    });
}

function find(email){
    return new Promise((resolve,reject)=>{
        const myCollection =  db.collection('users');
        const item =  myCollection.findOne({email: email});
        if(item){
            resolve(item);
        }else{
            reject(err);
        }
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    });
}

// update - deposit/withdraw amount 
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, docs) {
                    err ? reject(err) : resolve(docs);
                }
            );            
    });    
}




// all users
function all(){
    return new Promise(async(resolve, reject) => {  
                try{
                const customers = await db.collection('users').find().toArray();
                if(customers.length>0){ 
                    resolve(customers);
                }   
                else{
                  
                    resolve({});
                }
            }
            catch(error){
                console.log('there is an error while fetching the customers',error);
                reject(error);
            }
         
    });
}


//delete a user as the user decided to quit our beautiful bank! 
function deleteUser(email){
    return new Promise((resolve,reject)=>{
        console.log(email);
        const customers = db
            .collection('users')
            .deleteOne({email:email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    

    });
    
}


module.exports = {create, find, findOne, update, all,deleteUser};