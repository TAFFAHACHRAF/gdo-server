import express from "express";
import {getImporterConsultations,getImporterConsultationById,createImporterConsultation,deleteImporterConsultation,updateImporterConsultation} from "../controlllers/ImporterConsultation.js";
const router = express.Router() 

router.get('/',getImporterConsultations)
router.get('/:importerConsultationId',getImporterConsultationById)
router.post('/', createImporterConsultation)
router.delete('/:importerConsultationId', deleteImporterConsultation)
router.patch('/:importerConsultationId',updateImporterConsultation)

export default router   