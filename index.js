import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from "cors"
import adRouter from './routes/user.js';



await mongoose.connect(process.env.MONGO_URI);
const connectionString = process.env.MONGO_URI;




const app = express();

mongoose.connect(connectionString).then(() => {
    console.log('database connected')
}).catch((err) => {
    console.log(err)
})

const PORT = 8000;

// Middleware to parse JSON requests
app.use(cors())
app.use(express.json());

app.use(adRouter);

 

const port = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});