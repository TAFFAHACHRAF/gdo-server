import {Seller} from "../models/Company.js";
import {Compte} from "../models/Compte.js";

export const getSellers = async (req,res)=>{
    try{
        const sellers = await Seller.find();
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
        console.json(err)
    }
}

export const countSellers = async (req,res)=>{
    try{
        const countSellers = await Seller.countDocuments({})
        res.json({countSellers});
    }catch(err){
        res.json({message : err.message})
    }
}

export const createSeller = async (req,res,next) => {
    const compte = {
        email : req.body.email,
        password : req.body.password
    }
    const newCompte=new Compte(compte);
    const saved=await newCompte.save();

    if(saved){
        const compte = await Compte.findOne({email : req.body.email,password : req.body.password});
        const seller = {
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
        const newSeller = new Seller(seller)

        try{
            const saved=await newSeller.save()
            res.send(saved) 
        }catch(err){
            res.status(409).json({message : err.message})
        }
    }
    else{
        res.send('Accound cant be created');
    }
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
                    socialReason: req.body.socialReason,
                    nationality: req.body.nationality,
                    speciality: req.body.speciality,
                    tradeRegister: req.body.tradeRegister,
                    juridicalStatute: req.body.juridicalStatute,
                    faxNumber: req.body.faxNumber,
                    phoneNumber: req.body.phoneNumber,
                    adresse: req.body.adresse,
                    isSeller: req.body.isSeller
                }  
            }
        );
        res.json(updateSeller);
    } catch (err){
        res.json({message : err})
    }
}
