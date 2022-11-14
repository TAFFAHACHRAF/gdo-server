import express from "express";
import {getGuides,getGuideById,createGuide,deleteGuide,updateGuide,getGuidesCount,signin} from "../controlllers/Guide.js";
const router = express.Router() 

router.get('/',getGuides) // get all
router.get('/:guideId',getGuideById) // get by is
router.get('/count/count',getGuidesCount) // get by is
router.post('/', createGuide)
router.delete('/:guideId', deleteGuide)
router.patch('/:guideId',updateGuide)
//Sign in
router.post('/signin',signin)


export default router   