import  mongoose from "mongoose"
import crypto from 'crypto'
import {v1 as uuidv1} from 'uuid';

const CoachSchema = mongoose.Schema({
    first_name:{
        type : String,
        required : false
    },
    family_name:{
        type : String,
        required : false
    },
    email:{     
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
    nationality : {
        type : String,
        required : true
    },
    speciality : {
        type : String,
        required : true
    },
    hasLogo:{
        type : String,
        default: 'false'
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
    date_created:{
        type : Date,
        default: Date.now,
        required : false
    },
    date_modifyed: {
        type : Date,
        required : false
    },
    salt : String
});

CoachSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
})

CoachSchema.methods = {
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


const Coach = mongoose.model('Coach',CoachSchema);
export default Coach
