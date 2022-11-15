import express from "express";
import {getSellers,getSellerById,createSeller,deleteSeller,updateSeller,countSellers} from "../controlllers/Seller.js";
const router = express.Router() 

router.get('/',getSellers)
router.get('/:SellerId',getSellerById)
router.get('/count/count',countSellers)
router.post('/', createSeller)
router.delete('/:SellerId', deleteSeller)
router.patch('/:SellerId',updateSeller)

  
export default router   