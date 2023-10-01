const express = require('express');
const router = express.Router();

stats = {} 
const proxyUrl = 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com:80'; // Remplacez par l'URL du proxy Fixie Sock


router.get('/', async (req, res) => {

   try {
       const response = await fetch("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
           method: 'GET',
           headers: {
               Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjVhMjAzYzE3LWFkMmYtNDFkZi1iMDI0LWRmMjc2ZmE1YmU0NyIsImlhdCI6MTY5NjE5NTM3OSwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzQuMTkyLjMxLjg5IiwiMzQuMTkyLjM3LjEwOCIsIjg5Ljg0LjIwMS4yMiIsIjg5LjgxLjE0MC41NyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.O5XEPMRJXCPEwxceDHCxz5q6rKjggf4w9Ds5Hm-SMPxsCgAHfTB_VnkxUKNYDLqCJpaeObLJ61LVjszm5OUwrw' ,
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