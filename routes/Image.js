import express from 'express'
const router = express.Router()
import multer from 'multer'
import UserImgSchema from '../models/Image.js'
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();


import { createImg, getImages ,getImg , deletImg,updateImg,deletImgCoach,deletImgGuide,deletImgImporter,deletImgSeller,deletImgTransporter} from '../controlllers/Image.js'

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'images')
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + '-' + file.originalname)
  },
})


const upload = multer({ storage: storage })

router.post('/upload/:userId',upload.single("myfile"),async (req, res) => {
  try {
    const imageExists = await UserImgSchema.findOne({ user: req.params.userId });
    if (imageExists) {
        return res.status(400).json({ error: 'Image already used' });
    }
      
    const Images = await UserImgSchema.create({
      filePath: req.file.filename,
      fileName: req.file.originalname,
      user: req.params.userId
    })

    const saved = await Images.save()

    res.status(StatusCodes.OK).send({saved})
} catch (error) {
    res.status(500).json({ msg: error })
  }
})

router.route('/').get(getImages)

router.route('/:userId').get(getImg)

router.route('/:ImageId').delete(deletImg)

router.route('/deleteImporter/:ImporterId').delete(deletImgImporter)

router.route('/deleteTransporter/:TransporterId').delete(deletImgTransporter)

router.route('/deleteSeller/:SellerId').delete(deletImgSeller)

router.route('/deleteGuide/:GuideId').delete(deletImgGuide)

router.route('/deleteCoach/:CoachId').delete(deletImgCoach)

// router.route('/update/:userId').patch(upload.single('myfile')).patch(updateImg)

router.patch('/update/:userId',upload.single("myfile"),async (req, res) => {

  try {
      const userImgSchema0 = await UserImgSchema.findOne({ user : req.params.userId })
      const oldimage = userImgSchema0.filePath
      fs.unlinkSync(path.join(__dirname,'/images/',oldimage))

      const userImgSchema = await UserImgSchema.findOneAndUpdate(
         ({ user : req.params.userId }),
         {filePath: req.file.filename,
          fileName: req.file.originalname, }
      );
      return res.status(201).send({userImgSchema})
  
  } catch(e) {
      return res.status(500).json({error : e})
  }
  
  })

export default router