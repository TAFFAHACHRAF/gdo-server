import express from "express";
import {getAdministrators,getAdministratorById,createAdministrator,deleteAdministrator,updateAdministrator, signin} from "../controlllers/Administrator.js";
const router = express.Router() 

router.get('/',getAdministrators)
router.get('/:AdministratorId',getAdministratorById)
router.post('/', createAdministrator)
router.delete('/:AdministratorId', deleteAdministrator)
router.patch('/:AdministratorId',updateAdministrator)
router.post('/signin',signin)

export default router   