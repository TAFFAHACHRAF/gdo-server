import  mongoose from "mongoose"
import pkg from 'mongoose';
const { Schema } = pkg;

const GuideConsultationSchema = mongoose.Schema({
    follower:{     
        type : String,
        required: true,
        index:true, 
        unique:true,
        sparse:true
    },
    guide:{     
        type : String,
        required: true,
        unique : 'true'
    },
    title:{
        type : String,
        required : true
    },                                                                                                                                                                                  
    description:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        required : true
    },
    validation : {
        type : String,
        default : 'false'
    }
});
const GuideConsultation = mongoose.model('GuideConsultation',GuideConsultationSchema);
export default GuideConsultation
