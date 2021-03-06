
const path = require("path");
const Twit = require("twit");
const request = require('request');
const config = require(path.join(__dirname, "config.js"));
const T = new Twit(config);


/** Helper functions **/

/**
 * Transform file to base64 encoded string.
 *
 * @param file
 * @returns {*}
 */
const base64_encode = fileBuffer => new Buffer(fileBuffer, 'binary').toString('base64');

/** End Helper functions **/


/**
 * Notify user when the entire process is done.
 *
 * @param error
 * @param response
 */
const notify = (error, response) => {

  if (error) return console.error(error);

  console.info('Done posting image to twitter!');
};

/**
 * Update twitter timeline with newly updated image.
 *
 * @param error
 * @param response
 */
const updateStatus = (error, response) => {

  if (error) return console.error(error);

  console.info('Updating twitter timeline.');

  T.post('statuses/update', {
    media_ids: new Array(response.media_id_string)
  }, notify);
};

/**
 * Upload image to twitter.
 *
 * @param error
 * @param response
 * @param body
 * @returns {*}
 */
const uploadMediaContent = (error, response, body) => {

  if (error) return response.end(error.message);

  console.info('Uploading image to twitter.');

  T.post('media/upload', {
    media_data: base64_encode(body)
  }, updateStatus);
};

/**
 * Retrieve image from cloudinary.
 */
const retrieveImage = () => {

  let photoId = Math.floor((Math.random() * 100) + 1);
  let requestOptions = {
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
    })
    .end();
};

// Bot entry point. Spin things up :)
const init = () => retrieveImage();

// Expose the `init` function, so it can be administered by the clock/cron module.
module.exports = init;
