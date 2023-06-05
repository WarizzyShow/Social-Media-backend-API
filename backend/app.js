import express, { Router } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: './config.env'});
const app = express();
const Dport =  process.env.port;
const uri = process.env.URI;
import userRouter from './routes/user.js' ;
import blogRouter from './routes/blog.js';

app.use(express.json())
app.use("/api/user", userRouter); 
app.use("/api/blog", blogRouter)

app.listen(Dport, ()=>{
    console.log(`listening to port ${Dport}`)
    db_connect()
})


const db_connect = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(uri);
		console.log("db connected");
	} catch (err) {
		throw err;
	}
};
mongoose.connection.on("disconnected", () => {
	console.log("mongdb disconnected");
});