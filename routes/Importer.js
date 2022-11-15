import express from "express";
import {getImporters,getImporterById,createImporter,deleteImporter,updateImporter,countImporters} from "../controlllers/Importer.js";
const router = express.Router() 

router.get('/',getImporters)
router.get('/:ImporterId',getImporterById)
router.get('/count/count',countImporters)
router.post('/', createImporter)
router.delete('/:ImporterId', deleteImporter)
router.patch('/:ImporterId',updateImporter)

  
export default router   