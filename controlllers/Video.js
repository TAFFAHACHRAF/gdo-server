import TrainingVideoSchema from '../models/Video.js'
import { StatusCodes } from 'http-status-codes'
import fs, { chmodSync } from 'fs'
import path from 'path';
const __dirname = path.resolve();
import multer from 'multer'

const createVideo = async (req, res, next) => {
  try {
    const videoExists = await TrainingVideoSchema.findOne({ training: req.params.TrainingId });
    if (videoExists) {
        return res.status(400).json({ error: 'Video already exist' });
    }

    const Videos = await TrainingVideoSchema.create({
      filePath: req.file.filename,
      fileName: req.file.originalname,
      training: req.params.TrainingId
    })

    const saved = await Videos.save()

    res.status(StatusCodes.OK).send({saved})
  } catch (error) {
    res.status(500).json({ msg: Videos })
  }
}

const getVideos = async (req, res, next) => {
  try {
    const Videos = await TrainingVideoSchema.find()
    res.status(StatusCodes.OK).json({ Videos })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getVideo = async (req, res, next) => {
  try {
    const Video = await TrainingVideoSchema.find({ training : req.params.TrainingId})

    let filePath = path.join(__dirname,'/Videos/', Video[0].filePath);
    
    fs.createReadStream(filePath)
    .pipe(res)


  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deletVideo = async(req,res,next) => {
  try {
    const trainingVideoSchema = await TrainingVideoSchema.findById(req.params.VideoId)
    fs.unlinkSync(path.join(__dirname,'/Videos/',trainingVideoSchema.filePath))
    const deleteVideo =  trainingVideoSchema.deleteOne({ _id : req.params.VideoId})
    
    deleteVideo ? res.json({ message: 'deleted Inspecstib successfully' }) : res.json({ message : 'error'})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateVideo = async(req,res,next) => {
  try{
    const trainingVideoSchema0 = await TrainingVideoSchema.find({ training : '6303af58fb9e56cb650d520e' })
    const trainingVideoSchema = await TrainingVideoSchema.updateOne(
        { 
          _id : trainingVideoSchema0._id
        },
        { 
            $set : { 
                fileName : req.file.originalname,
                filePath:req.file.filename,
                training:trainingVideoSchema0.training
            }  
        }
    );
    res.json(trainingVideoSchema);
  } catch (err){
      res.json({message : err})
  }
}

export { createVideo, getVideos ,getVideo , deletVideo, updateVideo}