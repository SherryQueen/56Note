const fs = require("fs");
const path = require("path");

const imgPath = process.argv[2].startsWith("/")
  ? process.argv[2]
  : path.join(__dirname, process.argv[2]);
const image = fs.readFileSync(imgPath);
const ext = imgPath.slice(imgPath.lastIndexOf(".") + 1);
const name = imgPath.slice(
  imgPath.lastIndexOf("/") + 1,
  imgPath.lastIndexOf(".")
);
const base64 = Buffer.from(image, "binary").toString("base64");

const extMap = { jpg: "jpeg", jpeg: "jpeg", svg: "svg+xml", png: "png" };
fs.writeFileSync(
  path.join(__dirname, `${name}.txt`),
  `data:image/${extMap[ext]};base64,` + base64
);
