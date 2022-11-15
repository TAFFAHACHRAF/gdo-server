import mongoose from 'mongoose'
import pkg from 'mongoose';
const { Schema } = pkg;

const FileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
})

const ImageSchema = FileSchema.clone();
ImageSchema.add({
    isImage: {
        type: Boolean,
        default: false
    }
});

const VideoSchema = FileSchema.clone();
VideoSchema.add({
    isVideo: {
        type: Boolean,
        default: false
    }
});

export const File = mongoose.model('File',FileSchema);
export const Image = mongoose.model('Image',ImageSchema);
export const Video = mongoose.model('Video',VideoSchema);
