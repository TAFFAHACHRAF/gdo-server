import  mongoose from "mongoose"

const Source_ProductSchema = mongoose.Schema({
    link:{
        type : String,
        required : true
    },
    categorie:{
        type : String,
        required : true
    }
},{timestamps: true});

const Source_product = mongoose.model('Source_product',Source_ProductSchema);
export default Source_product
