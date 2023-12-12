const express = require("express");
const app = express();
const port = 3000;
const imageCache = require("../api/images.js");
const cors = require("cors");
app.use(cors());

/** this is a function that will help simulate delay  -> this is because the endpoint should sleep for 1-4 seconds before returning the result*/
let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
/** First endpoint => provides a list of image identifiers; is hardcoded*/
const getImageIds = () => {
  return [5, 3, 7, 4, 9, 1, 10, 15, 2, 8];
};

/** on this endpoint we get array of ids that are in the getImageIds function */
app.get("/api/images", (req, res) => {
  res.json(getImageIds());
});

/** second endpoint => provides the details of an image; GET request with the image ID as a path parameter */
app.get("/api/image/:imageId", async (req, res) => {
  const imageId = parseInt(req.params.imageId);
  const processTime = Math.floor(
    Math.random() * 3 + 1
  ); /** why 3 + 1 and not *4? Because Math.random can be 0, which means the server will return the results imediately and we want a 1 - 4 second delay. That is why we add +1 */
  await sleep(
    processTime * 1000
  ); /** add random number to the delay function */
  const imageDetails = imageCache.get(imageId);
  res.json(imageDetails);
});

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
