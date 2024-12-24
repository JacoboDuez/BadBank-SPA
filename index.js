var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const { Collection } = require('mongodb');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors()); // I enable the common origin resource se

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // check if account exists
    dal.find(req.params.email)
        .then((users) => {
            if(users ===null || users ===undefined || users === ''){
                dal.create(req.params.name,req.params.email,req.params.password).
                    then(
                        res.send('New User')   
                    )
            }
            else{
                res.send('user already exists');
            }
        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            let bProceed = true;
            if(user ===null || user ===undefined || user === ''){
                bProceed = false;
            }
            // if user exists, check password
            if(bProceed){
                if (user.password === req.params.password){
                    res.send(user);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});


// find user account
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email)
        .then((user) => {
            console.log(user);
            res.send(user);
    });
});


app.get('/account/delete/:email',function(req,res){
    dal.find(req.params.email)
        .then((user)=>{
            let bProceed = true;
            if(user ===null || user ==='' || user=== undefined){
                bProceed =  false
            }
            if(bProceed){
                dal.deleteUser(req.params.email).
                    then((user)=>{                        
                            res.send('User Successfully Deleted');  
                    });
            }
            else{
                res.send('User Not Found');
            }
        });
});


// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
    
    dal.findOne(req.params.email).
        then((user) => {
            res.send(user);
    });
});


// I update the amount on the user account
app.get('/account/update/:email/:amount', async function (req, res) {
    try {
        const amount = Number(req.params.amount);
        dal.find(req.params.email).
        then((user) => {
            let bProceed = true;
            if(user ===null || user ===undefined || user === ''){
                bProceed = false;
            }
            if(bProceed){
                const currentAmount =  user.balance;
                if(amount<0){
                    if(currentAmount+amount>=0){
                        console.log("within limits");
                        const response = dal.update(req.params.email, amount);
                        res.send('SUCCESSFUL TRANSACTION');
                        console.log(response.then().then());
                     }
                     else{
                        console.log('surpassing the limits');
                        res.send('Insufficient funds');
                    }
                }
                else{
                    const response  = dal.update(req.params.email,amount);
                    res.send('SUCCESSFUL TRANSACTION');
                }
            }});

    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'An error occurred while updating the account' });
    }
});



// get all accounts
app.get('/account/all', async function (req, res) {
    try{
        dal.all().
            then((users)=>{
                let bProceed =true;
                if(users===undefined || users===''|| users===null ){
                    bProceed= false;
                }
                if (bProceed){
                    res.send(users);
                    
                }
                else{
                    console.log('entering this other section');
                    res.send([]);
                }   
            })

    }
    catch(err){
        console.log('error!',err);
    }
});



//open the connection the express server
var port = 3000;
app.listen(port,()=>{
    console.log('running on port:' +  port);
});


