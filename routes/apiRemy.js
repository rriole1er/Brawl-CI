const express = require('express');
const router = express.Router();

stats = {} 


router.get('/', async (req, res) => {

   try {
       const response = await fetch("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
           method: 'GET',
           headers: {
               Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFhMDY3ZjU0LTA0MWYtNDViMi1iYzI0LWYxNzlkYWRiMDM0OSIsImlhdCI6MTY5NjE5NDM0MSwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTQuMjI3LjYzLjI0MSIsIjg5LjgxLjE0MC41NyIsIjg5Ljg0LjIwMS4yMiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.neoLG5aK0PvjPSCm5tQt0hPJyK7jq4sGoXkut1Gtx1lRsrUgkBr454L2Ui3bLGvkxFAiL98W1kbVmIUpDzDiBg',
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