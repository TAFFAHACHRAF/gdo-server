import  mongoose from "mongoose"
import crypto from 'crypto'
import {v1 as uuidv1} from 'uuid';

const VisitorSchema = mongoose.Schema({
    first_name:{
        type : String,
        required : false
    },
    family_name:{
        type : String,
        required : false
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
    email:{     
        type: String,
        required: true
    },
    encry_password : {
        type : String,
        trim : true,
        required : true
    },
    salt : String
},{timestamps: true});


VisitorSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv1()
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
})

VisitorSchema.methods = {
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

const Visitor = mongoose.model('Visitor',VisitorSchema);
export default Visitor
