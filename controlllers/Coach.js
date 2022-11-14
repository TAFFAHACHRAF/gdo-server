import Coach from '../models/Coach.js'
import jwt from "jsonwebtoken"
import { token } from 'morgan';
 

export const getCoachs = async (req,res)=>{
    try{
        const coachs = await Coach.find()
        res.status(200).send(coachs);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getCoachsCount = async (req,res)=>{
    try{
        const coachs = await Coach.countDocuments({})
        res.json({coachs});
    }catch(err){
        res.json({message : err.message})
    }
}

export const getCoachById = async (req,res)=>{
    try{
        const coach = await Coach.findById(req.params.coachId)
        res.json(coach);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const createCoach = async (req,res) => {
    const emailExists = await Coach.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'Email already used' });
    }

    const coach=req.body
    const newcoach = new Coach(coach)
    try{
        const saved=await newcoach.save()
        res.send({'_id' : saved._id})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body

    coach.findOne({email}, (err, coach) => {
        if(err || !coach){
            return res.status(400).json({
                error : "Email was not found"
            })
        }

        // Authentificate
        if(!coach.authentificate(password)){
            return res.status(400).json({
                error : "Email and password dot not match"
            })
        }

        // create token
        const accessToken = jwt.sign({_id: coach._id}, 'eifuefh845612@')

        // put token in cookie
        res.cookie('token',token,{expire: new Date() + 1})

        //send response
        const {_id, name, email} = coach
        return res.json({
            accessToken,
            coach: {
                _id,
                name,
                email
            }
        })
    })
}

export const deleteCoach = async (req,res) => {
    try{
        const removedcoach = await Coach.deleteOne({ _id : req.params.coachId})
        res.json(removedcoach);
    } catch (err){
        res.json({message : err})
    }
}

export const updateCoach = async (req,res) => {
    try{
        const updatecoach = await Coach.updateOne(
            { 
                _id : req.params.coachId
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
        res.json(updatecoach);
    } catch (err){
        res.json({message : err})
    }
}
