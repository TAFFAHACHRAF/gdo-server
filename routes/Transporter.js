import express from "express";
import {getTransporters,getTransporterById,createTransporter,deleteTransporter,updateTransporter,countTransporters} from "../controlllers/Transporter.js";
const router = express.Router() 

router.get('/',getTransporters)
router.get('/:TransporterId',getTransporterById)
router.get('/count/count',countTransporters)
router.post('/', createTransporter)
router.delete('/:TransporterId', deleteTransporter)
router.patch('/:TransporterId',updateTransporter)

  
export default router   