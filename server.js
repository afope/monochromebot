var Twit = require("twit");
var fs = require("fs"),
    path = require("path"),
    Twit = require("twit"),
    request = require('request');

var config = require(path.join(__dirname, "config.js"));
var T = new Twit(config);

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

// convert image to base64 encoded string
//var base64str = base64_encode('kitten.jpg');
//console.log(base64str);
// convert base64 string back to image
//base64_decode(base64str, 'copy.jpg');

function upload_random_image() {
    console.log('Opening an image...');
    // var photo_id = Math.floor((Math.random() * 100) + 1);
    var photo_id = 1
    var monochrome_image = request.get("http://res.cloudinary.com/didhg8jke/image/upload/v1485630774/MONOCHROME/" + photo_id,
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var base64str = base64_encode(monochrome_image);
        var b64content = fs.readFileSync(body, { encoding: 'base64' });
           console.log('Uploading an image...');
          T.post('media/upload', { media_data: b64content }, function(err, data, response) {
             if (err) {
                   console.log('ERROR');
               console.log(err);
               } else {
                   console.log('Uploaded an image!');

                    T.post('statuses/update', {
                           media_ids: new Array(data.media_id_string)
                       },
                     function(err, data, response) {
                         if (err) {
                           console.log("Error!");
                            console.log(err);
                      } else {
                          console.log("Posted an image!");
                     }
                    }
              );
               }
           });
        }
        console.log(response)
    });
}

setInterval(
    upload_random_image,
    100000
);
