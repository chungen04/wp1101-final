import mongoose from "mongoose"
import dotenv from "dotenv-defaults"
import {initData} from "./utility"

export default () => {
    dotenv.config();

    mongoose.connect(
        process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res)=>{
        console.log("mongo db connection created")
        initData()
    })
    const db = mongoose.connection
}