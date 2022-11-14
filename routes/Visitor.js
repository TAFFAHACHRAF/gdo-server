import express from "express";
import {getVisitors,getVisitorById,createVisitor,deleteVisitor,getVisitorsCount,updateVisitor, signin} from "../controlllers/Visitor.js";
const router = express.Router() 

router.get('/',getVisitors)
router.get('/:visitorId',getVisitorById)
router.get('/count/count',getVisitorsCount)
router.post('/', createVisitor)
router.delete('/:visitorId', deleteVisitor)
router.patch('/:visitorId',updateVisitor)
router.post('/signin',signin)

export default router   