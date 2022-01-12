import { google } from "googleapis"
import dotenv from "dotenv-defaults"
import path from "path"
import fs from "fs"
import stream from "stream"

dotenv.config()
const {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI, 
    REFRESH_TOKEN
} = process.env

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI, 
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: "v3",
    auth: oauth2Client
})

const filePath = path.join(__dirname, "report.pdf")

const uploadFile = async(name, uploadData) => {
    try{
        let bufferStream = new stream.PassThrough();
        bufferStream.end(uploadData.data)
        const response = await drive.files.create({
            resource: {
                name
            },
            media: {
                mimeType: "application/pdf",
                body: bufferStream
            }
        })
        return response.data.id
    }catch(error){
        console.log(error)
    }
}

const deleteFile = async(fileId) => {
    try{
        const response = await drive.files.delete({
            fileId
        })
        console.log(response.data, response.status)
    }catch(error){
        console.log(error)
    }
}

const generatePublicUrl = async(fileId) => {
    try{
        await drive.permissions.create({
            fileId,
            requestBody:{
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId,
            fields: 'webViewLink, webContentLink'
        })
        return result.data
    }catch(error){
        console.log(error)
    }
}

const logFile = () => {
    console.log(fs.createReadStream(filePath))
}

export default {uploadFile, deleteFile, generatePublicUrl, logFile}
