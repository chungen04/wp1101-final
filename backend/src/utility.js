import model from "./models"
import dotenv from "dotenv-defaults"
import bcrypt from "bcryptjs"

dotenv.config();

const {ADMIN_USERID, ADMIN_PASSWORD} = process.env 

const initData = async() => {
    await model.User.deleteMany()
    const saltRounds = 10;
    const password = await bcrypt.hash(ADMIN_PASSWORD, saltRounds)
    const admin = new model.User({userID: ADMIN_USERID, password})
    await admin.save()
}

export {
    initData
}
