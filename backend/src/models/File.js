import mongoose from "mongoose"

const Schema = mongoose.Schema
const fileSchema = new Schema({
    examID: {
        type: String,
        required: [true, 'examID field is required.']
    },
    questionDriveID: {
        type: String,
        required: [true, 'driveID field is required.']
    },
    questionDownloadLink: {
        type: String,
        required: [true, 'fileDownloadLink field is required.']
    },
    questionViewLink: {
        type: String,
        required: [true, 'fileViewLink field is required.']
    },
    answerDriveID: {
        type: String,
        required: false
    },
    answerDownloadLink: {
        type: String,
        required: false
    },
    answerViewLink: {
        type: String,
        required: false
    },
    uploadTime: {
        type: Date,
        default: Date.now()
    },
    show: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String,
        required: false
    }
})

const File = mongoose.model('File', fileSchema)
export default File
