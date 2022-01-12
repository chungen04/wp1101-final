import google from "../../google";

export default async(req, res) => {
  const file = req.files.file
  const id = await google.uploadFile(file.name, file);
  const data = await google.generatePublicUrl(id); 
  res.json({...data, id}); 
}
