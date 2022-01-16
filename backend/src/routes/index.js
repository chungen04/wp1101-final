import express from "express";
import getToken from "./api/getToken.js";
import uploadFile from "./api/uploadFile.js";

const router = express.Router()

router.post('/get-token', getToken)
router.post('/fileupload', uploadFile); 

export default router

