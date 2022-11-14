import  mongoose from "mongoose"
import pkg from 'mongoose';
const { Schema } = pkg;

const TransporterConsultationSchema = mongoose.Schema({
    follower: { type: Schema.Types.ObjectId, refPath: 'model_type'},
    model_type: {  type: String, enum: 'Transporter,Importer,Seller,Guide', required: false ,unique: true},
    transporter:{     
        type : Schema.Types.ObjectId,
        ref : 'Transporter',
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
const TransporterConsultation = mongoose.model('TransporterConsultation',TransporterConsultationSchema);
export default TransporterConsultation
