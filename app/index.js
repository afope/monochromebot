var fs = require("fs"),
  path = require("path"),
  Twit = require("twit"),
  request = require('request'),
  config = require(path.join(__dirname, "config.js")),
  T = new Twit(config);


/** Helper functions **/

/**
 * Transform file to base64 encoded string.
 *
 * @param file
 * @returns {*}
 */
function base64_encode(file) {

  return new Buffer(file, 'binary').toString('base64');
}

/**
 * Create new file from base64 encoded string.
 *
 * @param base64str
 * @param file
 */
function base64_decode(base64str, file) {

  var bitmap = new Buffer(base64str, 'base64');

  fs.writeFileSync(file, bitmap);
}

/** End Helper functions **/


/**
 * Notify user when the entire process is done.
 *
 * @param error
 * @param response
 */
function notify(error, response) {

  if (error) return console.error(error);

  console.info('Done posting image to twitter!');
}

/**
 * Update twitter timeline with newly updated image.
 *
 * @param error
 * @param response
 */
function updateStatus(error, response) {

  if (error) return console.error(error);

  console.info('Updating twitter timeline.');

  T.post('statuses/update', {media_ids: new Array(response.media_id_string)}, notify);
}

/**gg
 * Upload image to twitter.
 *
 * @param error
 * @param response
 * @param body
 * @returns {number}
 */
function uploadMediaContent(error, response, body) {

  if (error) return response.end(error.message);

  console.info('Uploading image to twitter.');

  T.post('media/upload', {media_data: base64_encode(body)}, updateStatus);
}

/**
 * Retrieve image from cloudinary.
 */
function retrieveImage() {

  var photoId = Math.floor((Math.random() * 100) + 1),
    requestOptions = {
      encoding: null
    };

  console.info('Retrieving image from the cloud.');

  request
   .get(
    "http://res.cloudinary.com/didhg8jke/image/upload/v1485630774/MONOCHROME/" + photoId,
    requestOptions,
    uploadMediaContent
  )
  .on('error', function (e) {
    // Handle errors, most importantly ETIMEDOUT error.
    console.error(e);
  }).end();
}

// Bot entry point. Spin things up :)
function init() {
  retrieveImage();
}

setInterval(init, 1800000);
