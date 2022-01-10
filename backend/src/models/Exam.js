import mongoose from "mongoose"

const Schema = mongoose.Schema
const examSchema = new Schema({
    courseID: {
        type: String,
        required: [true, 'courseID field is required.']
    },
    examName: {
        type: String,
        required: [true, 'examName field is required.']
    },
    examTime: {
        type: Number,
        required: [true, 'examTime field is required.']
    },
    files: [{
        type: mongoose.Types.ObjectId, 
        ref: "File"
    }],
    show: {
        type: Boolean,
        default: false
    },
})

const Exam = mongoose.model('Exam', examSchema)
export default Exam
