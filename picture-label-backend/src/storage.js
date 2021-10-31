import {Storage} from '@google-cloud/storage';
import {GOOGLE_STORAGE_BUCKET} from "./config";
import {v4 as uuid} from "uuid";

const storage = new Storage();

const bucket = storage.bucket(GOOGLE_STORAGE_BUCKET);

const saveImage = (file) => {
  return new Promise((resolve, reject) => {
    const imageId = uuid();
    const blob = bucket.file(imageId);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
      reject(err);
    });

    blobStream.on('finish', () => {
      resolve(imageId);
    });

    blobStream.end(file.buffer);
  });
};

const getImage = async (id) => {
  try {
    const files = await bucket.getFiles({
      startOffset: id,
      maxResults: 1
    });

    const file = files[0][0];
    if(file.name !== id) {
      return;
    }

    return file.publicUrl();
  } catch(err) {
    // pass, return nothing
  }
};

export default {
  saveImage,
  getImage
}
