import express from "express";
import {getTransporters,getTransporterById,createTransporter,deleteTransporter,getTransportersCount,updateTransporter, signin} from "../controlllers/Transporter.js";
const router = express.Router() 

router.get('/',getTransporters)
router.get('/:TransporterId',getTransporterById)
router.get('/count/count',getTransportersCount)
router.post('/', createTransporter)
router.delete('/:TransporterId', deleteTransporter)
router.patch('/:TransporterId',updateTransporter)
router.post('/signin',signin)

  
export default router   