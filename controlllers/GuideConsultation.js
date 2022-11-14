import GuideConsultation from '../models/GuideConsultation.js'
import Guide from '../models/Guide.js'
import Transporter from '../models/Transporter.js'
import Importer from '../models/Importer.js'
import Seller from '../models/Seller.js'
import mongoose from 'mongoose'
var ObjectId = mongoose.Types.ObjectId
 
export const getGuideConsultations = async (req,res)=>{
    try{
        const guideConsultations = await GuideConsultation.find();
        res.status(200).json(guideConsultations);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getGuideConsultationById = async (req,res)=>{
    try{
        const guideConsultation = await GuideConsultation.findById(req.params.guideConsultationId)
        res.json(guideConsultation);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const createGuideConsultation = async (req,res) => {
    if( !ObjectId.isValid(req.body.guide) || !ObjectId.isValid(req.body.follower) ){       
        res.json({error : 'Follower and Guide must have ObjectId type'})
    }
    else{
        const guide0 = await Guide.findById(req.body.guide) || null
        const follower0 = await Guide.findById(req.body.follower) || null
        const follower1 = await Transporter.findById(req.body.follower) || null
        const follower2 = await Importer.findById(req.body.follower) || null
        const follower3 = await Seller.findById(req.body.follower) || null
        const test = guide0 && (follower0 || follower1 || follower2 || follower3)
        if(!test){       
            res.json({error : 'Follower or Guide is not exists'})
        }
        else{
            var follower,guide

            guide=guide0.first_name + " " + guide0.family_name
            if(follower0){follower=follower0.first_name + " " + follower0.family_name}
            if(follower1){follower=follower1.social_reason}
            if(follower2){follower=follower2.social_reason}
            if(follower3){follower=follower3.social_reason}
            
            const guideConsultation = {
                follower:follower,
                guide: guide,
                type: req.body.type,
                title: req.body.title,
                description : req.body.description,
                date : req.body.date,
                validation : req.body.validation
            }
            
            const newGuideConsultation = new GuideConsultation(guideConsultation)
            try{
                const saved=await newGuideConsultation.save()
                res.send(saved)
            }catch(err){
                res.send({err})
            }
        }
    }
}

export const deleteGuideConsultation = async (req,res) => {
    try{
        const removedGuideConsultation = await GuideConsultation.deleteOne({ _id : req.params.guideConsultationId})
        res.json(removedGuideConsultation);
    } catch (err){
        res.json({message : err})
    }
}

export const updateGuideConsultation = async (req,res) => {
    if( !ObjectId.isValid(req.body.guide) || !ObjectId.isValid(req.body.follower) ){       
        res.send({error : 'Follower and Guide must have ObjectId type'})
    }
    else{
        const guide0 = await Guide.findById(req.body.guide) || null
        const follower0 = await Guide.findById(req.body.follower) || null
        const follower1 = await Transporter.findById(req.body.follower) || null
        const follower2 = await Importer.findById(req.body.follower) || null
        const follower3 = await Seller.findById(req.body.follower) || null
        const test = guide0 && (follower0 || follower1 || follower2 || follower3)
        if(!test){       
            res.send({error : 'Follower or Guide is not exists'})
        }
        else{
            var follower,guide

            guide=guide0.first_name + " " + guide0.family_name
            if(follower0){follower=follower0.first_name + " " + follower0.family_name}
            if(follower1){follower=follower1.social_reason}
            if(follower2){follower=follower2.social_reason}
            if(follower3){follower=follower3.social_reason}

            try{
                const updateGuideConsultation = await GuideConsultation.updateOne(
                    { 
                        _id : req.params.guideConsultationId
                    },
                    { 
                        $set : { 
                            follower:follower,
                            guide: guide,
                            title: req.body.title,
                            description : req.body.description,
                            date : req.body.date,
                            validation : req.body.validation
                        }  
                    }
                );
                res.json(updateGuideConsultation);
            } catch (err){
                res.json({message : err})
            }
        }
    }
}
