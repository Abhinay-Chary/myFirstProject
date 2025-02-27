const express = require('express');
const app = express();
const bp = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userSchema= require('./users/users');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const users = require('./users/users');
const Fruit = require('./fruits/addFruits');
mongoose.connect('mongodb+srv://abhinaychary1:Abhi%40sep27@cluster.vyskc.mongodb.net/').then(x=>{
    console.log('connected')
}).catch(e=>{
    console.log(e)
})
const tempUsers=[{name:'Abhi',password:'$2b$10$JK1TRnQMYo/IYjBelrCEX..JMe.bEmf9DjhMc4MM6SUH0xsgw.DO2'}];
    app.use(bp.json());
app.use(express.json());
app.use(cors());

//  mongoose.connect()
app.post('/signUp', async(req, res) => {
    console.log('signUp');
   
   let {name,password} =req.body;
   
   const hashp= await bcrypt.hash(password,10);
  
   const user1=new userSchema({name:name,password:hashp});
           const r= await user1.save();
           console.log(r)
   // tempUsers.push(user1)
    res.json('user signedUp').status(201);
   
});
app.post('/login',async (req, res) => {
    console.log('login');
    let {name,password}=req.body;
    
    //let user= await tempUsers.find(user=>user.name===name);
    user =await users.findOne({name:name});
    // console.log(user)
    if(user){  
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
     
       const result= await generateJwt(user); 
       
       res.json({user:user.name,message:'userExists',token:result,expires:10})
}else{
    res.json({message:'enter correct password'})
}
    }else{
res.json('failed!!')
    }

})

app.post('/addFruit',async(req,res)=>{
let {name,source}=req.body;
const fruit = new Fruit({name:name,source:source});
const resp=await fruit.save()
console.log(resp);
res.json(resp)
})
app.get('/getFruits',async (req,res)=>{
    console.log('called')
    const fruit= await  Fruit.find(); 
    res.json(fruit);
});
app.post('/updateFruits',async(req,res)=>{
    console.log(req.body)
const fruit= await Fruit.findOneAndUpdate({name:req.body.name},{price:req.body.price,quantity:req.body.quantity},{new:true});
res.json(fruit);
})
app.get('/getProducts',()=>{})
app.post('/addToCart',verifyJwt,(req,res)=>{

})
function verifyJwt(req,res,next){
    
    let verify;
    if(req.headers.token)
      verify=jwt.verify(req.headers.token,'abcd');
    try{
        if(verify)
            next() 
        else
        res.json('loggedOut')
    }catch(e){
        res.json(e)
    }
   

}


function generateJwt(user){
    const token= jwt.sign({name:user},'abcd',{expiresIn:2000})
    return token
}
app.listen(3000, () => {
    console.log('started')
})