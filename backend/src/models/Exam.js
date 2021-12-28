import mongoose from "mongoose"

const Schema = mongoose.Schema
const examSchema = new Schema({
    examName: {
        type: String,
        required: [true, 'examName field is required.']
    },
    files: [{
        type: mongoose.Types.ObjectId, 
        ref: "File"
    }]
})

const Exam = mongoose.model('Exam', examSchema)
export default Exam
