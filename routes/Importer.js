import express from "express";
import {getImporters,getImporterById,createImporter,deleteImporter,getImportersCount,updateImporter, signin} from "../controlllers/Importer.js";
const router = express.Router() 

router.get('/',getImporters)
router.get('/:ImporterId',getImporterById)
router.get('/count/count',getImportersCount) // get by is
router.post('/', createImporter)
router.delete('/:ImporterId', deleteImporter)
router.patch('/:ImporterId',updateImporter)
router.post('/signin',signin)


export default router   