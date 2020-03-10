const resizeWithBlur = require("./lib/resizeWithBlur");

// Example usage
resizeWithBlur({
  inputImage: "/cat.jpg",
  output: "/output/location", // output can be a file or directory
  width: 500,
  height: 500
});
