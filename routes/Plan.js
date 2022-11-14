import express from "express";
import {getPlans,getPlanById,createPlan,getPlansCount,deletePlan,updatePlan} from "../controlllers/Plan.js";
const router = express.Router() 

router.get('/',getPlans)
router.get('/:PlanId',getPlanById)
router.get('/count/count',getPlansCount) // get by is
router.get('/:PlanId',getPlanById)
router.post('/', createPlan)
router.delete('/:PlanId', deletePlan)
router.patch('/:PlanId',updatePlan)

export default router   