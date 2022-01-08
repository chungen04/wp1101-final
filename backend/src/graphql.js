import { ApolloServer, gql, AuthenticationError } from 'apollo-server-express'
import { readFileSync } from 'fs';
import dotenv from "dotenv-defaults"
import jwt from "jsonwebtoken"
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import db from './models'
import Course from "./resolvers/Course"
import Exam from "./resolvers/Exam"

dotenv.config()

const typeDefs = readFileSync('./src/schema.graphql').toString('utf-8')
const {SECRET_KEY} = process.env

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation,
        Course,
        Exam
    },
    context: async({req}) => {
        const token = req.headers.authorization || '';
        const splitToken = token.split(' ')[1]
        try {
            const result = jwt.verify(splitToken, SECRET_KEY)
            const {userID} = result
            const user = await db.User.findOne({userID})
            if (user){
                return { db, userID, login: true };
            }else{
                return { db, login: false };
            }
        } catch (e) {
            return { db, login: false };
        }
    }
})

export default server