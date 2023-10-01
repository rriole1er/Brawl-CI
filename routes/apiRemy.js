const express = require('express');
const router = express.Router();
const axios = require('axios'); // Utilisez la bibliothèque 'axios' pour effectuer des requêtes HTTP

const proxyUrl = 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com'; // Remplacez par l'URL du proxy Fixie Sock
const apiKey = 'REDACTED_API_KEY'; // Remplacez par votre clé d'API Brawl Stars

router.get('/', async (req, res) => {
   try {
       const response = await axios.get("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
           headers: {
               Authorization: `Bearer ${apiKey}`,
               Accept: 'application/json'
           },
           proxy: {
               host: proxyUrl,
               port: 80, // Port HTTP du proxy
           }
       });
       const stats = response.data;
       console.log(stats);
       res.render('vue', { data: stats });
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
   }
});

module.exports = router;