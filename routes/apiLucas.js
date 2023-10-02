const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = require('url');
stats = {} 

const fixieUrl = url.parse(process.env.FIXIE_URL || 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com');
const fixieAuth = fixieUrl.auth.split(':');

const apiKey = 'REDACTED_API_KEY';  // Remplacez par votre clé d'API Brawl Stars

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