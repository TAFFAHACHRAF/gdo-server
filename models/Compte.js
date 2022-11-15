import  mongoose from "mongoose"

const CompteSchema = mongoose.Schema({
    email:{     
        type: String,
        required: true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    verified : {
        type : String,
        default : 'false'
    },
    salt : String
});

const EssentielSchema = CompteSchema.clone();
EssentielSchema.add({
    isEssentiel: {
        type: Boolean,
        default: false
    }
});

const PremiumSchema = CompteSchema.clone();
PremiumSchema.add({
    isPremium: {
        type: Boolean,
        default: false
    }
});

const ProSchema = CompteSchema.clone();
ProSchema.add({
    isPro: {
        type: Boolean,
        default: false
    }
});

export const Compte = mongoose.model('Compte',CompteSchema);
export const Pro = mongoose.model('Pro',ProSchema);
export const Premium = mongoose.model('Premium',PremiumSchema);
export const Essentiel = mongoose.model('Essentiel',EssentielSchema);
