const express = require('express')
const app = express()
const port = 3000
let ejs = require('ejs');
app.set('view engine', 'ejs');



data = {} 

app.get('/', async (req, res) => {

  // try {
  //     const response = await fetch("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
  //         method: 'GET',
  //         headers: {
  //             Authorization: 'Bearer REDACTED_API_KEY',
  //             Accept: 'application/json'
  //         }
  //     });
  //     data = await response.json();

  // } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  // }

  res.render('vue');
});

app.listen(port, () => {
  console.log(`Example app listening don port ${port}`)
})