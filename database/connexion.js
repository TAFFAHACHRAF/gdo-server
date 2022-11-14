import mongoose from "mongoose";

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = mongoose.connect(process.env.DB)
        console.log(`MongoDB connected `);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDB