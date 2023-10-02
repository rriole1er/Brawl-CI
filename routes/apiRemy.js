const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = require('url');

const fixieUrl = url.parse(process.env.FIXIE_URL || 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com');
const fixieAuth = fixieUrl.auth.split(':');

const apiKey = 'REDACTED_API_KEY';  // Remplacez par votre clé d'API Brawl Stars

router.get('/', async (req, res) => {
    try {
        const response = await axios.get("https://api.brawlstars.com/v1/players/%23VUGVJYUY", {
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

router.get('/check-ip', async (req, res) => {
    try {
        const response = await axios.get('https://httpbin.org/ip', {
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

        const ipUsedByFixie = response.data.origin;
        console.log("IP utilisée par Fixie:", ipUsedByFixie);
        res.send(`IP utilisée par Fixie: ${ipUsedByFixie}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération de l\'IP.');
    }
});

module.exports = router;