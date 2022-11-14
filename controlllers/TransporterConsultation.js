import TransporterConsultation from '../models/TransporterConsultation.js'
 
export const getTransporterConsultations = async (req,res)=>{
    try{
        const transporterConsultations = await TransporterConsultation.find();
        res.status(200).json(transporterConsultations);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getTransporterConsultationById = async (req,res)=>{
    try{
        const transporterConsultation = await TransporterConsultation.findById(req.params.transporterConsultationId)
        res.json(transporterConsultation);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const createTransporterConsultation = async (req,res) => {
    const transporterConsultation=req.body
    const newTransporterConsultation = new TransporterConsultation(transporterConsultation)
    try{
        const saved=await newTransporterConsultation.save()
        res.send(saved)
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const deleteTransporterConsultation = async (req,res) => {
    try{
        const removedTransporterConsultation = await TransporterConsultation.deleteOne({ _id : req.params.transporterConsultationId})
        res.json(removedTransporterConsultation);
    } catch (err){
        res.json({message : err})
    }
}

export const updateTransporterConsultation = async (req,res) => {
    try{
        const updateTransporterConsultation = await TransporterConsultation.updateOne(
            { 
                _id : req.params.transporterConsultationId
            },
            { 
                $set : { 
                    follower:req.body.follower,
                    transporter:req.body.transporter,
                    type : req.body.type,
                    title : req.body.title,
                    description : req.body.description,
                    date : req.body.date,
                    validation : req.body.validation
                }  
            }
        );
        res.json(updateTransporterConsultation);
    } catch (err){
        res.status(400).json({message : err.message})
    }
}
