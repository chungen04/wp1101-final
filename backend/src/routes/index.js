import express from "express";
import getToken from "./api/getToken";
import uploadFile from "./api/uploadFile";

const router = express.Router()

router.post('/get-token', getToken)
router.post('/fileupload', uploadFile); 

export default router

