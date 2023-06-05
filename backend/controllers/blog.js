import mongoose from 'mongoose';
import blogModel from '../models/blog';
import User from '../models/user';

 export const GetAllBlog = async (req,res)=>{
    let blogs;
    try{
        blogs = await blogModel.find()
    } catch(err){
          console.log(err)
    }

    if(!blogs){
        return res.status(400).json({ message: "no blogs found"})
    }
     return res.status(200).json({blogs})
}

export const addBlog = async (req,res)=>{
    const { tittle, description, image, user} = req.body;
    let existingUser;
    try {
         existingUser = await User.findById(user)
    } catch(err){
       return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"unable to find user with this ID"})
    }
    const blog = new blogModel({
        tittle,
         description, 
         image, 
         user
    })

    try {
        const session = await mongoose.startSession();
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog)
        existingUser.save({session})
        await session.commitTransaction()
    } catch(err){
       return console.log(err)
       res.status(500).json({message: err})
    }
    return res.status(200).json({blog})
}

export const updateBlog = async (req, res)=>{
    const { tittle, description} = req.body
    const blogID = req.params.id;
    let blog;
    try{
        await blogModel.findByIdAndUpdate(blogID, {
         tittle, description
        })
    } catch(err){
     console.log(err);
    }
    if(!blog){
       return  res.status(400).json({ message: " unable to update blog"})
    }
    return res.status(200).json({blog})
}

export const getbyID = async (req,res)=>{
          const id = req.params.id
          let blog;
          try{
             blog = await blogModel.findById()
          } catch(err){
            console.log(err);
          }
          if(!blog){
            return res.status(400).json({ message:"unable to get blog"})
          }
          return res.status(200).json({blog})
}

export const DeleteBlog = async ( req,res)=>{
      const id = req.params.id;
      let blog;
      try {
         blog = await blogModel.findByIdAndRemove(id).populate('user');
         await blog.user.blogs.pull(blog)
         await blog.user.save()
      } catch(err){
        return console.log(err)
      }
      if(!blog){
        return res.status(400).json({ message:"unable to delete blog"});
      }
      return res.status(200).json({blmessage : "successfully deleted"})
}

export const getUserByID = async (req,res)=>{
     const userID = req.params.id;
     let Userblog ;
     try {
        Userblog.findById(userID).populate('blogs')

     } catch(err){
    return console.log(err)
     }

     if(!Userblog){
        return res.status(400).json({message: "no blogs found"})
     }
     res.status(200).json({ blogs: Userblog})
}