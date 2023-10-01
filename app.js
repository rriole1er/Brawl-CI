const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  try {
      const response = await fetch("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
          method: 'GET',
          headers: {
              Authorization: 'Bearer REDACTED_API_KEY',
              Accept: 'application/json'
          }
      });
      const data = await response.json();

      //console.log(data.tag);
      //console.log(data)

      //res.render('vue', { data: data });

      res.json(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }

});

app.listen(port, () => {
  console.log(`Example app listening don port ${port}`)
})