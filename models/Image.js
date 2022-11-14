import mongoose from 'mongoose'
import pkg from 'mongoose';
const { Schema } = pkg;

const UserImgSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  user: { type: [Schema.Types.ObjectId], refPath: 'model_type' ,default : 'null'},
  model_type: {  type: String, enum: 'Transporter,Importer,Seller,Guide', required: false ,unique: true}
})

export default mongoose.model('ImageUploder', UserImgSchema)