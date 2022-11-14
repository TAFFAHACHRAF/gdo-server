import express from "express";
import {getGuideConsultations,getGuideConsultationById,createGuideConsultation,deleteGuideConsultation,updateGuideConsultation} from "../controlllers/GuideConsultation.js";
const router = express.Router() 

router.get('/',getGuideConsultations)
router.get('/:guideConsultationId',getGuideConsultationById)
router.post('/', createGuideConsultation)
router.delete('/:guideConsultationId', deleteGuideConsultation)
router.patch('/:guideConsultationId',updateGuideConsultation)

export default router   