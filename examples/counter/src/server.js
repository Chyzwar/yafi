import express from 'express';

const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}`);
  }
});
