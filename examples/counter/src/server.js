import express from 'express';

const port = 3000;

let app = express();

app.get("/", function(req, res) {
  res.sendFile('public/index.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}`);
});
