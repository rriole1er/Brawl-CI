const express = require('express')
const app = express()
const port = 3000
let ejs = require('ejs');
app.set('view engine', 'ejs');



stats = {} 

app.get('/', async (req, res) => {
  res.render('vue');
});

app.get('/api', async (req, res) => {

   try {
       const response = await fetch("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
           method: 'GET',
           headers: {
               Authorization: 'Bearer REDACTED_API_KEY',
               Accept: 'application/json'
           }
       });
       stats = await response.json();

   } catch (error) {
       console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
   }

  res.render('vue',{data:stats});
});

app.listen(port, () => {
  console.log(`Example app listening don port ${port}`)
})