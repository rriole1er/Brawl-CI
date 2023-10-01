const express = require('express');
const router = express.Router();
import { HttpsProxyAgent } from 'https-proxy-agent';

const proxyUrl = 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com:80';

stats = {} 

router.get('/', async (req, res) => {

   try {
       const response = await fetch("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
           method: 'GET',
           headers: {
               Authorization: 'Bearer REDACTED_API_KEY' ,
               Accept: 'application/json'
           },
           agent: new HttpsProxyAgent(proxyUrl)
       });
       stats = await response.json();

   } catch (error) {
       console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
   }

   console.log(stats);

  res.render('vue',{data:stats});
});

module.exports = router;