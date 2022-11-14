import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken"
import { token } from 'morgan';
 

export const getSellers = async (req,res)=>{
    try{
        const sellers = await Seller.find()
        res.status(200).json(sellers);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getSellerById = async (req,res)=>{
    try{
        const seller = await Seller.findById(req.params.SellerId)
        res.json(seller);
    }catch(err){
        console.log(res.body)
    }
}

export const getSellersCount = async (req,res)=>{
    try{
        const sellers = await Seller.countDocuments({})
        res.json({sellers});
    }catch(err){
        res.json({message : err.message})
    }
}

export const createSeller = async (req,res) => {
    const emailExists = await Seller.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'Email already used' });
    }

    const seller=req.body
    const newSeller = new Seller(seller)
    try{
        const saved=await newSeller.save()
        res.send({'_id' : saved._id})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body

    Seller.findOne({email}, (err, Seller) => {
        if(err || !Seller){
            return res.status(400).json({
                error : "Email was not found"
            })
        }

        // Authentificate
        if(!Seller.authentificate(password)){
            return res.status(400).json({
                error : "Email and password dot not match"
            })
        }

        // create token
        const accessToken = jwt.sign({_id: Seller._id}, 'eifuefh845612@')

        // put token in cookie
        res.cookie('token',token,{expire: new Date() + 1})

        //send response
        const {_id, name, email} = Seller
        return res.json({
            accessToken,
            Seller: {
                _id,
                name,
                email
            }
        })
    })
}

export const deleteSeller = async (req,res) => {
    try{
        const removedSeller = await Seller.deleteOne({ _id : req.params.SellerId})
        res.json(removedSeller);
    } catch (err){
        res.json({message : err})
    }
}

export const updateSeller = async (req,res) => {
    try{
        const updateSeller = await Seller.updateOne(
            { 
                _id : req.params.SellerId
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
        res.json(updateSeller);
    } catch (err){
        res.json({message : err})
    }
}
