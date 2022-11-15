import mongoose from "mongoose";

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = mongoose.connect("mongodb+srv://achraf:achraf1234@cluster0.gzpxglp.mongodb.net/?retryWrites=true&w=majority")
        console.log(`MongoDB connected`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDB