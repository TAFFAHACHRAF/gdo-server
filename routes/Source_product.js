import express from "express";
import {getSource_products,getSource_productById,getSource_productsCount,createSource_product,deleteSource_product,updateSource_product} from "../controlllers/Source_product.js";
const router = express.Router() 

router.get('/',getSource_products)
router.get('/:Source_productId',getSource_productById)
router.get('/count/count',getSource_productsCount) // get by is
router.post('/', createSource_product)
router.delete('/:Source_productId', deleteSource_product)
router.patch('/:Source_productId',updateSource_product)

export default router   