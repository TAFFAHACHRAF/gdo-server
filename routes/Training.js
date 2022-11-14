import express from "express";
import {getTrainings,getTrainingById,createTraining,deleteTraining,getTrainingsCount,updateTraining} from "../controlllers/Training.js";
const router = express.Router() 

router.get('/',getTrainings)
router.get('/:trainingId',getTrainingById)
router.get('/count/count',getTrainingsCount)
router.post('/', createTraining)
router.delete('/:trainingId', deleteTraining)
router.patch('/:trainingId',updateTraining)

export default router   