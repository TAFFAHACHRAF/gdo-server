import Administrator from "../models/Administrator.js";
import jwt from "jsonwebtoken"
import { token } from 'morgan';


export const getAdministrators = async (req,res)=>{
    try{
        const administrators = await Administrator.find()
        res.status(200).json(administrators);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getAdministratorById = async (req,res)=>{
    try{
        const administrator = await Administrator.findById(req.params.AdministratorId)
        res.json(administrator);
    }catch(err){
        console.log(res.body)
    }
}

export const createAdministrator = async (req,res) => {
    const emailExists = await Administrator.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'Email already used' });
    }

    const administrator=req.body
    const newAdministrator = new Administrator(administrator)
    try{
        const saved=await newAdministrator.save()
        res.send({'_id' : saved._id})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body

    Administrator.findOne({email}, (err, Administrator) => {
        if(err || !Administrator){
            return res.status(400).json({
                error : "Email was not found"
            })
        }

        // Authentificate
        if(!Administrator.authentificate(password)){
            return res.status(400).json({
                error : "Email and password dot not match"
            })
        }

        // create token
        const accessToken = jwt.sign({_id: Administrator._id}, 'eifuefh845612@')

        // put token in cookie
        res.cookie('token',token,{expire: new Date() + 1})

        //send response
        const {_id, name, email} = Administrator
        return res.json({
            accessToken,
            Administrator: {
                _id,
                name,
                email
            }
        })
    })
}

export const deleteAdministrator = async (req,res) => {
    try{
        const removedAdministrator = await Administrator.deleteOne({ _id : req.params.AdministratorId})
        res.json(removedAdministrator);
    } catch (err){
        res.json({message : err})
    }
}

export const updateAdministrator = async (req,res) => {
    try{
        const updateAdministrator = await Administrator.updateOne(
            { 
                _id : req.params.AdministratorId
            },
            { 
                $set : { 
                    postal_code:req.body.postal_code,
                    fax_number : req.body.fax_number,
                    phone_number : req.body.phone_number,
                    adresse: req.body.adresse,
                    age:req.body.age,
                    city:req.body.city,
                    birthay : req.body.birthay,
                    profie_image : req.body.profie_image,
                    date_created : req.body.date_created,
                    date_modifyed : req.body.date_modifyed,
                    verified : req.body.verified,
                    user_type : req.body.user_type,
                    email : req.body.email,
                    password : req.body.password                    
                }  
            }
        );
        res.json(updateAdministrator);
    } catch (err){
        res.json({message : err})
    }
}
