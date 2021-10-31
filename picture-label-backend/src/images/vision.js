import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

const labelImage = async (imageUrl) => {
  const [result] = await client.labelDetection(imageUrl);
  const labels = result.labelAnnotations;
  return labels.map(label => label.description);
};

export default {
  labelImage
}
