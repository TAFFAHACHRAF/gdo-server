import  mongoose from "mongoose"
import pkg from 'mongoose';
const { Schema } = pkg;

const ImporterConsultationSchema = mongoose.Schema({
    follower: { type: Schema.Types.ObjectId, refPath: 'model_type'},
    model_type: {  type: String, enum: 'Transporter,Importer,Seller,Guide', required: false ,unique: true},
    guide:{     
        type : Schema.Types.ObjectId,
        ref : 'Importer',
        required: true
    },
    type:{
        type : String,
        required : true
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
const ImporterConsultation = mongoose.model('ImporterConsultation',ImporterConsultationSchema);
export default ImporterConsultation
