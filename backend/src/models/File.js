import mongoose from "mongoose"

const Schema = mongoose.Schema
const fileSchema = new Schema({
    examID: {
        type: String,
        required: [true, 'examID field is required.']
    },
    driveID: {
        type: String,
        required: [true, 'driveID field is required.']
    },
    fileDownloadLink: {
        type: String,
        required: [true, 'fileDownloadLink field is required.']
    },
    fileViewLink: {
        type: String,
        required: [true, 'fileViewLink field is required.']
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
