import  mongoose from "mongoose"

const PlanSchema = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    prix:{
        type : String,
        required : true
    },
    type:{
        type : String,
        required : true
    }
},{timestamps: true});

const Plan = mongoose.model('Plan',PlanSchema);
export default Plan
