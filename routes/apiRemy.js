const express = require('express');
const router = express.Router();

stats = {} 


router.get('/', async (req, res) => {

   try {
       const response = await fetch("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
           method: 'GET',
           headers: {
               Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQ3ODRlOTJjLTk3YzctNDZhYi1hNmRhLTFiMjI2YTU1ZWQ2NiIsImlhdCI6MTY5NjE1NDE1Miwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODkuODEuMTQwLjU3IiwiODkuODQuMjAxLjIyIl0sInR5cGUiOiJjbGllbnQifV19.O_BWITirMh8Jhz--h1Gl34Jy4Ns3R2Uow9C45i3agSh58C6ZN65lFxG68JleMhVFA9lLYZulv1QOjIMUwYvAIA',
               Accept: 'application/json'
           }
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