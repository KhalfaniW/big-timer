var fs = await require("fs.promises");
var path = await require("path");
var ssim = await require("ssim.js");
const { loadImage } = require("canvas");

var loadImage = async (location) => await fs.readFile(path.resolve(location));

var oldImg = await loadImage("./old.png");

var newImg = await loadImage("./new.png");

var {mssim, performance} = ssim.default(oldImg, newImg);
const sizeOf = require('image-size')
var dimensions = sizeOf('images/funny-cats.png')
console.log(dimensions.width, dimensions.height)


imgSSIM(
    "./old.png"
    , "./new.png"
    , (err, similarity) => {
        console.log(err || similarity);
        // => 0.7683075604309328
    });
