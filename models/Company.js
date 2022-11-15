import  mongoose from "mongoose"
import pkg from 'mongoose';
const { Schema } = pkg;

const CompanySchema = mongoose.Schema({
    socialReason:{     
        type: String,
        required: true
    },
    nationality : {
        type : String,
        required : true
    },
    speciality : {
        type : String,
        required : true
    },
    tradeRegister:{
        type: String,
        required: true
    },
    logo:{
        type: [Schema.Types.ObjectId], 
        ref: 'Image',
        required: false
    },
    juridicalStatute:{
        type: String,
        required: true
    },
    faxNumber:{
        type: String,
        required: false
    },
    phoneNumber:{
        type: String,
        required: true
    },
    adresse:{
        type: String,
        required: true
    },
    compte:{
        type: [Schema.Types.ObjectId], 
        refPath: 'Compte',
        required: true
    }
},{timestamps: true});

const ImporterSchema = CompanySchema.clone();
ImporterSchema.add({
    isImporter: {
        type: Boolean,
        default: true
    }
});

const SellerSchema = CompanySchema.clone();
SellerSchema.add({
    isSeller: {
        type: Boolean,
        default: true
    }
});

const TransporterSchema = CompanySchema.clone();
TransporterSchema.add({
    isTransporter: {
        type: Boolean,
        default: true
    }
});

export const Company = mongoose.model('Company',CompanySchema);
export const Transporter = mongoose.model('Transporter',TransporterSchema);
export const Seller = mongoose.model('Seller',SellerSchema);
export const Importer = mongoose.model('Importer',ImporterSchema);
