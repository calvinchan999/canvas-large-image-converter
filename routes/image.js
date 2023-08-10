const express = require("express");
const router = express.Router();
const { createCanvas, loadImage } = require("canvas");
const sharp = require("sharp");

router.post("/resize", async (req, res) => {
  const { img, newRatio } = req?.body;
  // e.g iVBORw0KGgoAAAANSUhEUgAANjQAAD8DCAIAAADNke9NAACAAElEQVR4XuzQ0W3jvLYGUJV5CjgPg"
  const bufferImage = Buffer.from(
    img.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  // Convert the image file to a supported format (e.g. JPEG)
  //const convertedImage = await sharp(bufferImage).jpeg().toBuffer();
  console.log('resize image start');
  const resizedImage = await sharp(bufferImage, {limitInputPixels: 1000000000 })
//    .resize({ width: 4080, height: 4080 })
    .jpeg()
    .toBuffer();
  console.log('resize complete');
  const imgData = await loadImage(resizedImage);

  const newWidth = imgData.width * newRatio;
  const newHeight = imgData.height * newRatio;

  const container = createCanvas(newWidth, newHeight);
  const ctx = container.getContext("2d");
  ctx.drawImage(imgData, 0, 0, newWidth, newHeight);

  const canvas = container.toBuffer("image/png").toString("base64");

  res.status(200).send({ image: canvas });
});

module.exports = router;
