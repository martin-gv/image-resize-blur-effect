const path = require("path");
const jimp = require("jimp");

module.exports = async ({ inputImage, output, width, height, blur }) => {
  const originalImage = await jimp.read(inputImage);

  // resize main image
  const mainImage = originalImage.clone().contain(width, height);

  // use default blur amount if not specified
  const blurAmount = blur || Math.floor((width + height) / 40);

  // create blur background and add main image
  const newImage = originalImage
    .clone()
    .cover(width, height) // crop background to size
    .blur(blurAmount)
    .composite(mainImage, 0, 0); // add main image

  // original file name
  const fileName = path.basename(inputImage);

  // check if output is specified as a file
  const outputIsFile = Boolean(path.extname(output));

  // use original file name if output is a folder
  const outputPath = outputIsFile ? output : path.join(output, fileName);

  await newImage.writeAsync(outputPath);
};
