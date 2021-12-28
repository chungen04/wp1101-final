import mongoose from "mongoose"

const Schema = mongoose.Schema
const fileSchema = new Schema({
    file: {
        type: String,
        required: [true, 'file field is required.']
    },
    uploadTime: {
        type: Date,
        default: Date.now()
    },
    show: {
        type: Boolean,
        default: false
    }
})

const File = mongoose.model('File', fileSchema)
export default File
