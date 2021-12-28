import { ApolloServer, gql, AuthenticationError } from 'apollo-server-express'
import { readFileSync } from 'fs';
import dotenv from "dotenv-defaults"
import jwt from "jsonwebtoken"
import Query from './resolvers/Query';
import User from './resolvers/User'

dotenv.config()

const typeDefs = readFileSync('./src/schema.graphql').toString('utf-8')
const {SECRET_KEY} = process.env

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query
    },
    context: ({req}) => {
        const token = req.headers.authorization || '';
        const splitToken = token.split(' ')[1]
        try {
            jwt.verify(splitToken, SECRET_KEY)
            return { login: true };
        } catch (e) {
            throw new AuthenticationError(
                'Authentication token is invalid, please log in',
            )
        }
    }
})

export default server