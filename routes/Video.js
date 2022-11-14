import express from 'express'
const router = express.Router()
import multer from 'multer'
import TrainingVideoSchema from '../models/Video.js'
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

import { createVideo, getVideos ,getVideo , deletVideo,updateVideo} from '../controlllers/Video.js'

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'Videos')
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

router.post('/upload/:TrainingId',upload.single("myvideo"),async (req, res) => {
  try {
    const videoExists = await TrainingVideoSchema.findOne({ training: req.params.TrainingId });
    if (videoExists) {
        return res.status(400).json({ error: 'Video already used' });
    }
      
    const Videos = await TrainingVideoSchema.create({
      filePath: req.file.filename,
      fileName: req.file.originalname,
      training: req.params.TrainingId
    })

    const saved = await Videos.save()

    res.status(StatusCodes.OK).send({saved})
} catch (error) {
    res.status(500).json({ msg: error })
  }
})


router.route('/').get(getVideos)

router.route('/:TrainingId').get(getVideo)

router.route('/:VideoId').delete(deletVideo)

// router.route('/update/:TrainingId').patch(upload.single('myvideo')).patch(updateVideo)

router.patch('/update/:TrainingId',upload.single("myvideo"),async (req, res) => {

  try {
      const trainingVideoSchema0 = await TrainingVideoSchema.findOne({ training: req.params.TrainingId })
      const oldVideo = trainingVideoSchema0.filePath
      fs.unlinkSync(path.join(__dirname,'/Videos/',oldVideo))

      const trainingVideoSchema = await TrainingVideoSchema.findOneAndUpdate(
         ({ training : req.params.TrainingId }),
         {filePath: req.file.filename,
          fileName: req.file.originalname, }
      );


      return res.status(201).send({trainingVideoSchema})
  
  } catch(e) {
      return res.status(500).json({error : true})
  }
  
  })

export default router