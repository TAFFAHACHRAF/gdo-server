import ImporterConsultation from '../models/ImporterConsultation.js'
 
export const getImporterConsultations = async (req,res)=>{
    try{
        const importerConsultations = await ImporterConsultation.find();
        res.status(200).json(importerConsultations);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getImporterConsultationById = async (req,res)=>{
    try{
        const importerConsultation = await ImporterConsultation.findById(req.params.importerConsultationId)
        res.json(importerConsultation);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const createImporterConsultation = async (req,res) => {
    const importerConsultation=req.body
    const newImporterConsultation = new ImporterConsultation(importerConsultation)
    try{
        const saved=await newImporterConsultation.save()
        res.send(saved)
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const deleteImporterConsultation = async (req,res) => {
    try{
        const removedImporterConsultation = await ImporterConsultation.deleteOne({ _id : req.params.importerConsultationId})
        res.json(removedImporterConsultation);
    } catch (err){
        res.json({message : err})
    }
}

export const updateImporterConsultation = async (req,res) => {
    try{
        const updateImporterConsultation = await ImporterConsultation.updateOne(
            { 
                _id : req.params.importerConsultationId
            },
            { 
                $set : { 
                    follower:req.body.follower,
                    importer:req.body.importer,
                    type : req.body.type,
                    title : req.body.title,
                    description : req.body.description,
                    date : req.body.date,
                    validation : req.body.validation,
                }  
            }
        );
        res.json(updateImporterConsultation);
    } catch (err){
        res.json({message : err})
    }
}
