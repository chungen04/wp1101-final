import mongoose from "mongoose"

const Schema = mongoose.Schema
const userSchema = new Schema({
    userID: {
        type: String,
        required: [true, 'userID field is required.']
    },
    password: {
        type: String,
        required: [true, 'Password field is required.']
    }
})

const User = mongoose.model('User', userSchema)
export default User
