import { google } from "googleapis"
import dotenv from "dotenv-defaults"
import path from "path"
import fs from "fs"

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

const uploadFile = async() => {
    try{
        const response = await drive.files.create({
            requestBody: {
                name: "testPDF.pdf",
                mimeType: "application/pdf"
            },
            media: {
                mimeType: "application/pdf",
                body: fs.createReadStream(filePath)
            }
        })
        console.log(response.data)
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
        console.log(result.data)
    }catch(error){
        console.log(error)
    }
}

export default {uploadFile, deleteFile, generatePublicUrl}
