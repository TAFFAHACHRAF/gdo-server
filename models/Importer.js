import  mongoose from "mongoose"
import pkg from 'mongoose';
const { Schema } = pkg;
import crypto from 'crypto'
import {v1 as uuidv1} from 'uuid';

const ImporterSchema = mongoose.Schema({
    social_reason:{     
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
    trade_register:{
        type: String,
        required: true
    },
    hasLogo:{
        type : String,
        default: 'false'
    },
    juridical_statute:{
        type: String,
        required: true
    },
    fax_number:{
        type: String,
        required: false
    },
    phone_number:{
        type: String,
        required: false
    },
    adresse:{
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    encry_password : {
        type : String,
        trim : true,
        required : true
    },
    verified : {
        type : String,
        default : 'false'
    },
    salt : String
},{timestamps: true});

ImporterSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
})

ImporterSchema.methods = {
    authentificate : function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return ""

        try{
            return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
        } catch(err){
            return ""
        }
    }
}

const Importer = mongoose.model('Importer',ImporterSchema);
export default Importer
