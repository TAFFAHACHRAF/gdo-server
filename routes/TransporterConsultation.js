import express from "express";
import {getTransporterConsultations,getTransporterConsultationById,createTransporterConsultation,deleteTransporterConsultation,updateTransporterConsultation} from "../controlllers/TransporterConsultation.js";
const router = express.Router() 

router.get('/',getTransporterConsultations)
router.get('/:transporterConsultationId',getTransporterConsultationById)
router.post('/', createTransporterConsultation)
router.delete('/:transporterConsultationId', deleteTransporterConsultation)
router.patch('/:transporterConsultationId',updateTransporterConsultation)

export default router   