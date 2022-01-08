import express from 'express';
import cors from 'cors'
import dotenv from "dotenv-defaults"
import http from "http";
import bodyParser from "body-parser"

import server from "./graphql"
import mongo from "./mongo"
import apiRoute from "./routes/index.js"
import file from "./google"

dotenv.config()

const port = process.env.PORT || 4000;

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api', apiRoute)

const startGraphqlServer = async() => {
    await server.start()
    server.applyMiddleware({ app })
}
startGraphqlServer();

mongo()

const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});