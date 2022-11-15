import {Transporter} from "../models/Company.js";
import {Compte} from "../models/Compte.js";

export const getTransporters = async (req,res)=>{
    try{
        const transporters = await Transporter.find();
        res.status(200).json(transporters);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getTransporterById = async (req,res)=>{
    try{
        const transporter = await Transporter.findById(req.params.TransporterId)
        res.json(transporter);
    }catch(err){
        console.log(res.body)
    }
}

export const countTransporters = async (req,res)=>{
    try{
        const countTransporters = await Transporter.countDocuments({})
        res.json({countTransporters});
    }catch(err){
        res.json({message : err.message})
    }
}

export const createTransporter = async (req,res,next) => {
    const compte = {
        email : req.body.email,
        password : req.body.password
    }
    const newCompte=new Compte(compte);
    const saved=await newCompte.save();

    if(saved){
        const compte = await Compte.findOne({email : req.body.email,password : req.body.password});
        const transporter= {
            socialReason : req.body.socialReason,
            nationality : req.body.nationality,
            speciality : req.body.speciality,
            tradeRegister : req.body.tradeRegister,
            juridicalStatute : req.body.juridicalStatute,
            faxNumber : req.body.faxNumber,
            phoneNumber : req.body.phoneNumber,
            adresse : req.body.adresse,
            compte : compte._id
        }
        const newTransporter = new Transporter(transporter)

        try{
            const saved=await newTransporter.save()
            res.send(saved) 
        }catch(err){
            res.status(409).json({message : err.message})
        }
    }
}

export const deleteTransporter = async (req,res) => {
    try{
        const removedTransporter = await Transporter.deleteOne({ _id : req.params.TransporterId})
        res.json(removedTransporter);
    } catch (err){
        res.json({message : err})
    }
}

export const updateTransporter = async (req,res) => {
    try{
        const updateTransporter = await Transporter.updateOne(
            { 
                _id : req.params.TransporterId
            },
            { 
                $set : { 
                    socialReason: req.body.socialReason,
                    nationality: req.body.nationality,
                    speciality: req.body.speciality,
                    tradeRegister: req.body.tradeRegister,
                    juridicalStatute: req.body.juridicalStatute,
                    faxNumber: req.body.faxNumber,
                    phoneNumber: req.body.phoneNumber,
                    adresse: req.body.adresse,
                    isTransporter:req.body.isTransporter
                }  
            }
        );
        res.json(updateTransporter);
    } catch (err){
        res.json({message : err})
    }
}
