const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = require('url');
stats = {} 

const fixieUrl = url.parse(process.env.FIXIE_URL || 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com');
const fixieAuth = fixieUrl.auth.split(':');

const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFlNGNkYjFjLTk5NGUtNGI3OS1iOTU0LWM5NDdkMDRiN2RhYiIsImlhdCI6MTY5NjI0MzM0MCwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODkuODEuMTQwLjU3IiwiODkuODQuMjAxLjIyIiwiNTQuMTczLjIyOS4yMDAiLCI1NC4xNzUuMjMwLjI1MiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.iMye8z_CTbpWMtnFEiJXrrZx-xXJfDeB5sS7fTVI31Qp9Jwj1-cbs88hfGSVZrNsxq8h0ExZYGrT_d3w4IJngQ';  // Remplacez par votre clé d'API Brawl Stars

router.get('/proxy', async (req, res) => {
    try {
        const response = await axios.get("https://api.brawlstars.com/v1/players/%2320GGQPVVL", {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                Accept: 'application/json'
            },
            proxy: {
                protocol: 'http',
                host: fixieUrl.hostname,
                port: fixieUrl.port,
                auth: {
                    username: fixieAuth[0],
                    password: fixieAuth[1]
                }
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

router.get('/', async (req, res) => {
    try {
        const response = await fetch("https://api.brawlstars.com/v1/players/%2320GGQPVVL", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiKey}`,
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

module.exports = router;