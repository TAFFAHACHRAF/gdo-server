import Importer from "../models/Importer.js";
import UserImgSchema from '../models/Image.js'
import jwt from "jsonwebtoken"
import { token } from 'morgan';

 

export const getImporters = async (req,res)=>{
    try{
        const importers = await Importer.find()
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

export const getImportersCount = async (req,res)=>{
    try{
        const importers = await Importer.countDocuments({})
        res.json({importers});
    }catch(err){
        res.json({message : err.message})
    }
}

export const createImporter = async (req,res) => {
    const emailExists = await Importer.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'Email already used' });
    }

    const importer=req.body
    const newImporter = new Importer(importer)
    try{
        const saved=await newImporter.save()
        res.send({'_id' : saved._id})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body

    Importer.findOne({email}, (err, Importer) => {
        if(err || !Importer){
            return res.status(400).json({
                error : "Email was not found"
            })
        }

        // Authentificate
        if(!Importer.authentificate(password)){
            return res.status(400).json({
                error : "Email and password dot not match"
            })
        }

        // create token
        const accessToken = jwt.sign({_id: Importer._id}, 'eifuefh845612@')

        // put token in cookie
        res.cookie('token',token,{expire: new Date() + 1})

        //send response
        const {_id, name, email} = Importer
        return res.json({
            accessToken,
            Importer: {
                _id,
                name,
                email
            }
        })
    })
}

export const deleteImporter = async (req,res) => {
    try{
        const removedImporter = await Importer.deleteOne({ _id : req.params.ImporterId})
        res.json(removedImporter);
    } catch (err){
        res.json({message : {err}})
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
                    social_reason:req.body.social_reason,
                    nationality:req.body.nationality,
                    speciality:req.body.speciality,
                    trade_register:req.body.trade_register,
                    company_logo : req.body.company_logo,
                    juridical_statute:req.body.juridical_statute,
                    postal_code:req.body.postal_code,
                    fax_number : req.body.fax_number,
                    phone_number : req.body.phone_number,
                    adresse: req.body.adresse,
                    verified : req.body.verified,
                    email : req.body.email,
                    password : req.body.password,
                    hasLogo:req.body.hasLogo
                }  
            }
        );
        res.json(updateImporter);
    } catch (err){
        res.json({message : err})
    }
}
