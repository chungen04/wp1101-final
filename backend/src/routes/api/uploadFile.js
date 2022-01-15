import google from "../../google";

export default async(req, res) => {
  const file = req.files.file
  const id = await google.uploadFile(file.name, file);
  if(!id) res.sendStatus(503).end()
  const data = await google.generatePublicUrl(id); 
  res.json({...data, id}); 
}
