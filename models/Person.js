import  mongoose from "mongoose"
import pkg from 'mongoose';
const { Schema } = pkg;

const PersonSchema = mongoose.Schema({
    firstName:{     
        type: String,
        required: true
    },
    familytName:{     
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
    image:{
        type: [Schema.Types.ObjectId], 
        refPath: 'Image',
        required: false
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


const AdministratorSchema = Person.clone();
AdministratorSchema.add({
    isAdministrator: {
        type: Boolean,
        default: false
    }
});

const CoachSchema = Person.clone();
CoachSchema.add({
    isCoach: {
        type: Boolean,
        default: false
    }
});

const GuideSchema = Person.clone();
GuideSchema.add({
    isGuide: {
        type: Boolean,
        default: false
    }
});

const VisitorSchema = Person.clone();
VisitorSchema.add({
    isVisitor: {
        type: Boolean,
        default: false
    }
});

const Visitor = mongoose.model('Visitor',VisitorSchema);
const Guide = mongoose.model('Guide',GuideSchema);
const Coach = mongoose.model('Coach',CoachSchema);
const Administrator = mongoose.model('Administrator',AdministratorSchema);
const Person = mongoose.model('Person',PersonSchema);

export default {Administrator,Coach,Guide,Visitor};
