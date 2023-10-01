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
  //             Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijc3ZGUwOTYyLWIxMDMtNDA2NC05ODgwLTQyZjMwY2ZjZDUyYSIsImlhdCI6MTY5NjA5NzI2OCwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODkuODQuMjAxLjIyIl0sInR5cGUiOiJjbGllbnQifV19.cLHY9Vq-BUnHtrNVTJ-TGW2O3LsONOEBd6JhBuFPeCTlK-IAGYRWIU61nFv6T3ody2N6ZTLy94mKRX-NpoKEqQ',
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