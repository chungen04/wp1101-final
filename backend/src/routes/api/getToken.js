import bcrypt from "bcryptjs"
import model from "../../models"
import jwt from "jsonwebtoken"
import dotenv from "dotenv-defaults"

dotenv.config()

const {SECRET_KEY} = process.env

export default async (req, res) => {
    const { userID, password } = req.body
    const user = await model.User.findOne({userID})
    if (user) {
        //we use bcrypt to compare the hash in the database (mock.js) to the password the user provides
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            //we create the JWT for the user with our secret
            //inside the token we encrypt some user data
            //then we send the token to the user
            const token = jwt.sign(
                { userID: user.userID, id: user.id },
                SECRET_KEY,
            )

            res.send({
                success: true,
                token: token,
            })
        } else {
            //return error to user to let them know the password is incorrect
            res.status(401).send({
                success: false,
                message: 'Incorrect credentials',
            })
        }
    } else {
        //return error to user to let them know the account there are using does not exists
        res.status(404).send({
            success: false,
            message: `Could not find account: ${userID}`,
        })
    }
}