import express from "express";
import {getCoachs,getCoachById,createCoach,deleteCoach,updateCoach,getCoachsCount,signin} from "../controlllers/Coach.js";
const router = express.Router() 

router.get('/',getCoachs) // get all
router.get('/:coachId',getCoachById) // get by is
router.get('/count/count',getCoachsCount) // get by is
router.post('/', createCoach)
router.delete('/:coachId', deleteCoach)
router.patch('/:coachId',updateCoach)
//Sign in
router.post('/signin',signin)


export default router   