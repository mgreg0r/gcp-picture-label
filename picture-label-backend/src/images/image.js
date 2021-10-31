import vision from "./vision";
import storage from "../storage";

export const getImageHandler = async (req, res) => {
  const {user} = req.session;
  if(!user) {
    res.status(401).end();
    return;
  }

  const imageId = req.params.id;
  const imageUrl = await storage.getImage(imageId);
  if(!imageUrl) {
    res.status(404).end();
    return;
  }

  res.status(200).json({
    src: imageUrl,
    id: imageId,
  }).end();
};

export const labelImageHandler = async (req, res) => {
  const {user} = req.session;
  if(!user) {
    res.status(401).end();
    return;
  }

  const imageId = req.params.id;
  const imageUrl = await storage.getImage(imageId);
  if(!imageUrl) {
    res.status(404).end();
    return;
  }

  try {
    const result = await vision.labelImage(imageUrl);
    res.status(200).send(result).end();
  } catch(err) {
    if (err.code === 400)
      res.status(400).end();
    else res.status(500).end();
  }
};
