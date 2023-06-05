import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const getUser = async (req,res)=>{
    let users;
     try{
       users = await User.find();
     } catch(err){
       return  console.log(err)
     }
     if(users == []) {
       return res.status(404).json({ message: "No users found"})
     }
     return res.status(200).json({users}); 
}

export const SignUp = async (req,res)=>{
     const { email,name, password} = req.body;
     let existingUser;
     try{
          existingUser = await User.findOne({email})
     } catch(err){
       return  console.log(err)
     }
     if(existingUser) {
        res.status(400).json({message:'user already exist'})
     }
     const hashPassword =  bcrypt.hashSync(password)
     const user = new User({
        email,
        name,
        password : hashPassword,
        blog : []
     })

     try {
         await user.save()
     } catch(err){
       return  console.log(err)
     }
     res.status(200).json({user})
}


export const login = async (req,res)=>{
    const { email, password} = req.body;
    let existingUser;
    try{
         existingUser = await User.findOne({email})
    } catch(err){
      return  console.log(err)
    }
    if(!existingUser) {
       res.status(404).json({message:'user does not exist'})
    }
    const ComparePassword = bcrypt.compareSync(password, existingUser.password)
    
    if(!ComparePassword){
        return res.status(400).json({ message : "incorrect password"})
    }
    res.status(200).json({message:'login successful'})
}