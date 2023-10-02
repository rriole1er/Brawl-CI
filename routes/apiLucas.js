const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = require('url');

const fixieUrl = url.parse(process.env.FIXIE_URL || 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com');
const fixieAuth = fixieUrl.auth.split(':');

const apiKey = 'REDACTED_API_KEY';  // Remplacez par votre clé d'API Brawl Stars

router.get('/', async (req, res) => {
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

module.exports = router;