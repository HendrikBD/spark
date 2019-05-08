import 'reflect-metadata';

const express = require('express'),
  app = express();

app.get('/', (req: any, res: any) => {
  res.send('hello world!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
