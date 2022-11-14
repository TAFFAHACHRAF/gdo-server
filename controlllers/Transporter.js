import Transporter from "../models/Transporter.js";
import jwt from "jsonwebtoken"
import { token } from 'morgan';
import * as multer from "multer"




export const getTransporters = async (req,res)=>{
    try{
        const transporters = await Transporter.find()
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

export const getTransportersCount = async (req,res)=>{
    try{
        const transporters = await Transporter.countDocuments({})
        res.json({transporters});
    }catch(err){
        res.json({message : err.message})
    }
}

export const createTransporter = async (req,res,next) => {
    const emailExists = await Transporter.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'Email already used' });
    }

    const transporter= req.body
    const newTransporter = new Transporter(transporter)
    try{
        const saved=await newTransporter.save()
        res.send(saved) 
        console.log(saved)
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body

    Transporter.findOne({email}, (err, Transporter) => {
        if(err || !Transporter){
            return res.status(400).json({
                error : "Email was not found"
            })
        }

        // Authentificate
        if(!Transporter.authentificate(password)){
            return res.status(400).json({
                error : "Email and password dot not match"
            })
        }

        // create token
        const accessToken = jwt.sign({_id: Transporter._id}, 'eifuefh845612@')

        // put token in cookie
        res.cookie('token',token,{expire: new Date() + 1})

        //send response
        const {_id, name, email} = Transporter
        return res.json({
            accessToken,
            Transporter: {
                _id,
                name,
                email
            }
        })
    })
}

export const deleteTransporter = async (req,res) => {
    try{
        // const removedTransporter = await Transporter.deleteMany({ verified : { $gte: 'false' } })
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
        res.json(updateTransporter);
    } catch (err){
        res.json({message : err})
    }
}
