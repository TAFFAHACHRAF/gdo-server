import Source_product from "../models/Source_product.js";

export const getSource_products = async (req,res)=>{
    try{
        const source_products = await Source_product.find()
        res.status(200).json(source_products);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getSource_productsCount = async (req,res)=>{
    try{
        const source_products = await Source_product.countDocuments({})
        res.json({source_products});
    }catch(err){
        res.json({message : err.message})
    }
}

export const getSource_productById = async (req,res)=>{
    try{
        const source_product = await Source_product.findById(req.params.Source_productId)
        res.json(source_product);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const createSource_product = async (req,res) => {
    const source_productExists = await Source_product.findOne({ link: req.body.link });
    if (source_productExists) {
        return res.status(400).json({ error: 'Source_product already exists' });
    }

    const source_product=req.body
    const newSource_product = new Source_product(source_product)
    try{
        const saved=await newSource_product.save()
        res.send({saved})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const deleteSource_product = async (req,res) => {
    try{
        const removedSource_product = await Source_product.deleteOne({ _id : req.params.Source_productId})
        res.json(removedSource_product);
    } catch (err){
        res.json({message : err})
    }
}

export const updateSource_product = async (req,res) => {
    try{
        const updateSource_product = await Source_product.updateOne(
            { 
                _id : req.params.Source_productId
            },
            { 
                $set : { 
                    link : req.body.link,
                    categorie : req.body.categorie
                }  
            }
        );
        res.json(updateSource_product);
    } catch (err){
        res.json({message : err})
    }
}
