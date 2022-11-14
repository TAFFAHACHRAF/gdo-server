import Guide from '../models/Guide.js'
import jwt from "jsonwebtoken"
import { token } from 'morgan';
 

export const getGuides = async (req,res)=>{
    try{
        const guides = await Guide.find()
        res.status(200).send(guides);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getGuidesCount = async (req,res)=>{
    try{
        const guides = await Guide.countDocuments({})
        res.json({guides});
    }catch(err){
        res.json({message : err.message})
    }
}

export const getGuideById = async (req,res)=>{
    try{
        const guide = await Guide.findById(req.params.guideId)
        res.json(guide);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const createGuide = async (req,res) => {
    const emailExists = await Guide.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'Email already used' });
    }

    const guide=req.body
    const newGuide = new Guide(guide)
    try{
        const saved=await newGuide.save()
        res.send({'_id' : saved._id})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body

    Guide.findOne({email}, (err, Guide) => {
        if(err || !Guide){
            return res.status(400).json({
                error : "Email was not found"
            })
        }

        // Authentificate
        if(!Guide.authentificate(password)){
            return res.status(400).json({
                error : "Email and password dot not match"
            })
        }

        // create token
        const accessToken = jwt.sign({_id: Guide._id}, 'eifuefh845612@')

        // put token in cookie
        res.cookie('token',token,{expire: new Date() + 1})

        //send response
        const {_id, name, email} = Guide
        return res.json({
            accessToken,
            Guide: {
                _id,
                name,
                email
            }
        })
    })
}

export const deleteGuide = async (req,res) => {
    try{
        const removedGuide = await Guide.deleteOne({ _id : req.params.guideId})
        res.json(removedGuide);
    } catch (err){
        res.json({message : err})
    }
}

export const updateGuide = async (req,res) => {
    try{
        const updateGuide = await Guide.updateOne(
            { 
                _id : req.params.guideId
            },
            { 
                $set : { 
                    first_name  :  req.body.first_name ,
                    family_name  :  req.body.family_name ,
                    email  :  req.body.email ,
                    fax_number :  req.body.fax_number ,
                    phone_number : req.body.phone_number ,
                    adresse : req.body.adresse ,
                    nationality : req.body.nationality ,
                    speciality : req.body.speciality ,
                    password  :  req.body.password ,
                    verified  :  req.body.verified,
                    hasLogo : req.body.hasLogo                                 
                }  
            }
        );
        res.json(updateGuide);
    } catch (err){
        res.json({message : err})
    }
}
