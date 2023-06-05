import mongoose from "mongoose";
const Schema = mongoose.Schema

const BlogSChema = new Schema({
    tittle : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
       type : String,
       required: true
    },
    user: {
        type : mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Blog = mongoose.model('Blog', BlogSChema);
export default  Blog;