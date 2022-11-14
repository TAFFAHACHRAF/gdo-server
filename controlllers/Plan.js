import Plan from "../models/Plan.js";

export const getPlans = async (req,res)=>{
    try{
        const plans = await Plan.find()
        res.status(200).json(plans);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const getPlansCount = async (req,res)=>{
    try{
        const plans = await Plan.countDocuments({})
        res.json({plans});
    }catch(err){
        res.json({message : err.message})
    }
}

export const getPlanById = async (req,res)=>{
    try{
        const plan = await Plan.findById(req.params.PlanId)
        res.json(plan);
    }catch(err){
        res.status(400).json({message : err.message})
    }
}

export const createPlan = async (req,res) => {
    const planExists = await Plan.findOne({ type: req.body.type });
    if (planExists) {
        return res.status(400).json({ error: 'Plan already exists' });
    }

    const plan=req.body
    const newPlan = new Plan(plan)
    try{
        const saved=await newPlan.save()
        res.send({saved})
    }catch(err){
        res.status(409).json({message : err.message})
    }
}

export const deletePlan = async (req,res) => {
    try{
        const removedPlan = await Plan.deleteOne({ _id : req.params.PlanId})
        res.json(removedPlan);
    } catch (err){
        res.json({message : err})
    }
}

export const updatePlan = async (req,res) => {
    try{
        const updatePlan = await Plan.updateOne(
            { 
                _id : req.params.PlanId
            },
            { 
                $set : { 
                    title : req.body.title,
                    prix : req.body.prix,
                    type : req.body.type
                }  
            }
        );
        res.json(updatePlan);
    } catch (err){
        res.json({message : err})
    }
}
