import {Importer} from "../models/Company.js";
import {Compte} from "../models/Compte.js";

export const getImporters = async (req,res)=>{
    try{
        const importers = await Importer.find();
        res.status(200).json(importers);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getImporterById = async (req,res)=>{
    try{
        const importer = await Importer.findById(req.params.ImporterId)
        res.json(importer);
    }catch(err){
        console.log(res.body)
    }
}

export const countImporters = async (req,res)=>{
    try{
        const countImporters = await Importer.countDocuments({})
        res.json({countImporters});
    }catch(err){
        res.json({message : err.message})
    }
}

export const createImporter = async (req,res,next) => {
    const compte = {
        email : req.body.email,
        password : req.body.password
    }
    const newCompte=new Compte(compte);
    const saved=await newCompte.save();

    if(saved){
        const compte = await Compte.findOne({email : req.body.email,password : req.body.password});
        const importer= {
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
        const newImporter = new Importer(importer)

        try{
            const saved=await newImporter.save()
            res.send(saved) 
        }catch(err){
            res.status(409).json({message : err.message})
        }
    }
}

export const deleteImporter = async (req,res) => {
    try{
        const removedImporter = await Importer.deleteOne({ _id : req.params.ImporterId})
        res.json(removedImporter);
    } catch (err){
        res.json({message : err})
    }
}

export const updateImporter = async (req,res) => {
    try{
        const updateImporter = await Importer.updateOne(
            { 
                _id : req.params.ImporterId
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
                    isImporter:req.body.isImporter
                }  
            }
        );
        res.json(updateImporter);
    } catch (err){
        res.json({message : err})
    }
}
