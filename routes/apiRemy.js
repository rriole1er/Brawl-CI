const express = require('express');
const router = express.Router();
const axios = require('axios'); // Utilisez la bibliothèque 'axios' pour effectuer des requêtes HTTP

const proxyUrl = 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com'; // Remplacez par l'URL du proxy Fixie Sock
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVhMjAzYzE3LWFkMmYtNDFkZi1iMDI0LWRmMjc2ZmE1YmU0NyIsImlhdCI6MTY5NjE5NTM3OSwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzQuMTkyLjMxLjg5IiwiMzQuMTkyLjM3LjEwOCIsIjg5Ljg0LjIwMS4yMiIsIjg5LjgxLjE0MC41NyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.O5XEPMRJXCPEwxceDHCxz5q6rKjggf4w9Ds5Hm-SMPxsCgAHfTB_VnkxUKNYDLqCJpaeObLJ61LVjszm5OUwrw'; // Remplacez par votre clé d'API Brawl Stars

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