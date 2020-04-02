const express = require('express');
const path = require('path');
const axios = require('axios');

const PORT = 3000;
const app = express();

const files = path.join(__dirname, '../dist');
app.use(express.static(files) );

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'dist' } );
});

app.get('/users', async (req, res) => {
  const data = await axios({
      method: 'get',
      url: 'https://api.github.com/users',
  })
  const response = await data;
  res.status(200).json({
    status: 200,
    data: response.data,
  });

});
app.get('/users/:name', async (req, res) => {
  const { name } = req.params
  const data = await axios({
        method: 'get',
        url: `https://api.github.com/users/${name}/repos`,
  })
  const response = await data    
  res.status(200).json({
    status: 200,
    data: response.data,
  });
});

app.get('/users/:name/:namerepo', async (req, res) => {
  const { name, namerepo} = req.params
  const data = await axios({
    method: 'get',
    url: `https://api.github.com/repos/${name}/${namerepo}/commits`,
  })
  const response = await data    
  res.status(200).json({
    status: 200,
    data: response.data,
  });
});

app.listen(PORT);
console.log(`La aplicación esta escuchando en  http://localhost:${PORT}`);