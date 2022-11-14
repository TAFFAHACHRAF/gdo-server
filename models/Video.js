import mongoose from 'mongoose'
import pkg from 'mongoose';
const { Schema } = pkg;

const TrainingVideoSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  training: { type: [Schema.Types.ObjectId], refPath: 'model_type' ,default : 'null'},
  model_type: {  type: String, enum: 'Training', required: false }
})

export default mongoose.model('VideoUploder', TrainingVideoSchema)