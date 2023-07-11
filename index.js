// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
require('dotenv').config();
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  let unixTimeStamp;
  let utcFormattedDate;
  const dateValue = req.params.date;

  if (dateValue) {
    const parsedDate = isNaN(dateValue) ? new Date(dateValue) : new Date(parseInt(dateValue));
    const isValidDate = !isNaN(parsedDate);

    if (isValidDate) {
      unixTimeStamp = parsedDate.getTime();
      utcFormattedDate = parsedDate.toUTCString();
    } else {
      res.json({ error: "Invalid Date" });
      return;
    }
  } else {
    unixTimeStamp = Date.now();
    utcFormattedDate = new Date().toUTCString();
  }

  res.json({
    unix: unixTimeStamp,
    utc: utcFormattedDate
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
