import Visitor from "../models/Visitor.js";
import jwt from "jsonwebtoken"
import { token } from 'morgan';

export const getVisitors = async (req,res)=>{
    try{
        const visitors = await Visitor.find()
        res.status(200).json(visitors);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getVisitorById = async (req,res)=>{
    try{
        const visitor = await Visitor.findById(req.params.visitorId)
        res.json(visitor);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getVisitorsCount = async (req,res)=>{
    try{
        const visitors = await Visitor.countDocuments({})
        res.json({visitors});
    }catch(err){
        res.json({message : err.message})
    }
}

export const createVisitor = async (req,res) => {
    const emailExists = await Visitor.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'Email already used' });
    }

    const visitor=req.body
    const newVisitor = new Visitor(visitor)
    try{
        const saved=await newVisitor.save()
        res.send({saved})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body

    Visitor.findOne({email}, (err, Visitor) => {
        if(err || !Visitor){
            return res.status(400).json({
                error : "Email was not found"
            })
        }

        // Authentificate
        if(!Visitor.authentificate(password)){
            return res.status(400).json({
                error : "Email and password dot not match"
            })
        }

        // create token
        const accessToken = jwt.sign({_id: Visitor._id}, 'eifuefh845612@')

        // put token in cookie
        res.cookie('token',token,{expire: new Date() + 1})

        //send response
        const {_id, name, email} = Visitor
        return res.json({
            accessToken,
            Visitor: {
                _id,
                name,
                email
            }
        })
    })
}

export const deleteVisitor = async (req,res) => {
    try{
        const removedVisitor = await Visitor.deleteOne({ _id : req.params.visitorId})
        res.json(removedVisitor);
    } catch (err){
        res.json({message : err})
    }
}

export const updateVisitor = async (req,res) => {
    try{
        const updateVisitor = await Visitor.updateOne(
            { 
                _id : req.params.visitorId
            },
            { 
                $set : { 
                    first_name : req.body.first_name,
                    family_name : req.body.family_name,
                    email : req.body.email,
                    password : req.body.password              
                }  
            }
        );
        res.json(updateVisitor);
    } catch (err){
        res.json({message : err})
    }
}
