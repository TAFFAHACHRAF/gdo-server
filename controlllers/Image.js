import UserImgSchema from '../models/Image.js'
import { StatusCodes } from 'http-status-codes'
import fs, { chmodSync } from 'fs'
import path from 'path';
const __dirname = path.resolve();
import multer from 'multer'

const createImg = async (req, res, next) => {
  try {
    const images = await UserImgSchema.create({
      filePath: req.file.filename,
      fileName: req.file.originalname,
      user: req.params.userId
    })

    const saved = await images.save()

    res.status(StatusCodes.OK).send({ _id : saved._id })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getImages = async (req, res, next) => {
  try {
    const images = await UserImgSchema.find()
    res.status(StatusCodes.OK).json({ images })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getImg = async (req, res, next) => {
  try {
    const image = await UserImgSchema.find({ user : req.params.userId})

    let filePath = path.join(__dirname,'/images/', image[0].filePath);
    
    fs.createReadStream(filePath)
    .pipe(res)


  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deletImg = async(req,res,next) => {
  try {
    const userImgSchema = await UserImgSchema.findById(req.params.ImageId)
    fs.unlinkSync(path.join(__dirname,'/images/',userImgSchema.filePath))
    const deleteImage =  userImgSchema.deleteOne({ _id : req.params.ImageId})
    
    deleteImage ? res.json({ message: 'deleted Inspecstib successfully' }) : res.json({ message : 'error'})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deletImgImporter = async(req,res,next) => {
  try {
    const userImgSchema = await UserImgSchema.findOne({user : req.params.ImporterId})
    fs.unlinkSync(path.join(__dirname,'/images/',userImgSchema.filePath))
    const deleteImage =  userImgSchema.deleteOne({ user : req.params.ImageId})
    
    deleteImage ? res.json({ message: 'deleted Inspecstib successfully' }) : res.json({ message : 'error'})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deletImgTransporter = async(req,res,next) => {
  try {
    const userImgSchema = await UserImgSchema.findOne({user : req.params.TransporterId})
    fs.unlinkSync(path.join(__dirname,'/images/',userImgSchema.filePath))
    const deleteImage =  userImgSchema.deleteOne({ user : req.params.ImageId})
    
    deleteImage ? res.json({ message: 'deleted Inspecstib successfully' }) : res.json({ message : 'error'})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deletImgSeller = async(req,res,next) => {
  try {
    const userImgSchema = await UserImgSchema.findOne({user : req.params.SellerId})
    fs.unlinkSync(path.join(__dirname,'/images/',userImgSchema.filePath))
    const deleteImage =  userImgSchema.deleteOne({ user : req.params.ImageId})
    
    deleteImage ? res.json({ message: 'deleted Inspecstib successfully' }) : res.json({ message : 'error'})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deletImgGuide = async(req,res,next) => {
  try {
    const userImgSchema = await UserImgSchema.findOne({user : req.params.GuideId})
    fs.unlinkSync(path.join(__dirname,'/images/',userImgSchema.filePath))
    const deleteImage =  userImgSchema.deleteOne({ user : req.params.ImageId})
    
    deleteImage ? res.json({ message: 'deleted Inspecstib successfully' }) : res.json({ message : 'error'})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deletImgCoach = async(req,res,next) => {
  try {
    const userImgSchema = await UserImgSchema.findOne({user : req.params.CoachId})
    fs.unlinkSync(path.join(__dirname,'/images/',userImgSchema.filePath))
    const deleteImage =  userImgSchema.deleteOne({ user : req.params.ImageId})
    
    deleteImage ? res.json({ message: 'deleted Inspecstib successfully' }) : res.json({ message : 'error'})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateImg = async(req,res,next) => {
  try{
    const userImgSchema0 = await UserImgSchema.find({ user : '6303af58fb9e56cb650d520e' })
    const userImgSchema = await UserImgSchema.updateOne(
        { 
          _id : userImgSchema0._id
        },
        { 
            $set : { 
                fileName : req.file.originalname,
                filePath:req.file.filename,
                user:userImgSchema0.user
            }  
        }
    );
    res.json(userImgSchema);
  } catch (err){
      res.json({message : err})
  }
}



export { createImg, getImages ,getImg , deletImgCoach ,deletImgGuide,deletImg,deletImgImporter, updateImg,deletImgTransporter,deletImgSeller}