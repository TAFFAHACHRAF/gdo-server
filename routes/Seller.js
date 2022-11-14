import express from "express";
import {getSellers,getSellerById,createSeller,deleteSeller,getSellersCount,updateSeller, signin} from "../controlllers/Seller.js";
const router = express.Router() 

router.get('/',getSellers)
router.get('/:SellerId',getSellerById)
router.get('/count/count',getSellersCount)
router.post('/', createSeller)
router.delete('/:SellerId', deleteSeller)
router.patch('/:SellerId',updateSeller)
router.post('/signin',signin)


export default router   