const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys.js');
const requireLogin = require('../middleware/requireLogin');

// router.get("/protected",requireLogin,(req,res) =>{
//     res.send("Hello");
// })

router.post("/signup",(req,res) =>{
    console.log(req.body.email);
    const {name,email,password} = req.body;
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email}).then((savedUser) =>{
        if(savedUser){
            return res.status(422).json({error:"User already exist !!"})
        }
        bcrypt.hash(password,12).then((hashedpassword)=>{

        const user = new User({
            email,
            password:hashedpassword,
            name,
        })
        user.save().then(user=>{
            res.json({message:"User saved successfully!"})
        })
        .catch((err)=>{
            console.log(err)
        })
       
    })
    // console.log(req.body)
    .catch((err)=>{
        console.log(err)})
    })
})

router.post("/login", (req,res)=>{
    console.log(req.body.email)
    const {email, password} = req.body
    if (!email || !password){
        return res.status(422).json({error:"Please enter email or password"})
    }
    User.findOne({ email: email}).then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password."})
        }
        bcrypt.compare(password, savedUser.password).then(doMatch=>{
            if(doMatch){
                // res.json({message:"Successfully signed in."})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id, name, email,followers, following} = savedUser
                res.json({token,user:{_id,name,email, followers, following}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password."})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err);
    })
})
module.exports = router;