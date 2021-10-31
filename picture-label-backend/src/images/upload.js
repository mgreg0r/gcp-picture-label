import storage from "../storage";

export const uploadHandler = async (req, res) => {
  const {user} = req.session;
  if(!user) {
    res.status(401).end();
    return;
  }

  if (!req.file) {
    res.status(400).json({
      error: 'NO_FILE_UPLOADED'
    }).end();
    return;
  }

  let imageId;
  try {
    imageId = await storage.saveImage(req.file);
  } catch(err) {
    if(err.code === 400) {
      res.status(400).json({
        error: 'INVALID_IMAGE_FILE'
      });
      return;
    }

    res.status(500).end();
    return;
  }

  res.status(200).json({
    imageId
  });
};
