import express from "express";
import getToken from "./api/getToken";

const router = express.Router()

router.post('/get-token', getToken)

export default router

