const express = require('express');
const router = express.Router();
const axios = require('axios');
const NodeCache = require('node-cache'); // Utilisez un module de cache comme node-cache
const url = require('url');

const fixieUrl = url.parse(process.env.FIXIE_URL || 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com');
const fixieAuth = fixieUrl.auth.split(':');
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFlNGNkYjFjLTk5NGUtNGI3OS1iOTU0LWM5NDdkMDRiN2RhYiIsImlhdCI6MTY5NjI0MzM0MCwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODkuODEuMTQwLjU3IiwiODkuODQuMjAxLjIyIiwiNTQuMTczLjIyOS4yMDAiLCI1NC4xNzUuMjMwLjI1MiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.iMye8z_CTbpWMtnFEiJXrrZx-xXJfDeB5sS7fTVI31Qp9Jwj1-cbs88hfGSVZrNsxq8h0ExZYGrT_d3w4IJngQ';  // Remplacez par votre clé d'API Brawl Stars

const cache = new NodeCache();
const cacheKey = 'brawl-stars-data'; // Clé de cache pour les données Brawl Stars

// Fonction pour récupérer les données depuis l'API Brawl Stars
async function fetchDataFromBrawlStars() {
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
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Route pour obtenir les données Brawl Stars
router.get('/proxy', async (req, res) => {
    try {
        // Vérifiez si les données sont en cache
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            // Si les données sont en cache, renvoyez-les sans faire de nouvelle requête
            console.log('Données en cache');
            res.render('vue', { data: cachedData });
        } else {
            // Si les données ne sont pas en cache, récupérez-les depuis l'API Brawl Stars
            const stats = await fetchDataFromBrawlStars();
            
            // Mettez les données en cache pour les prochaines 6 heures (ou votre délai souhaité)
            cache.set(cacheKey, stats, 6 * 60 * 60); // Cache pendant 6 heures
            
            res.render('vue', { data: stats });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

// La route '/' pour récupérer les données sans utiliser le proxy
router.get('/', async (req, res) => {
    try {
        // Utilisez votre fonction fetchDataFromBrawlStars pour récupérer les données sans utiliser le proxy
        const stats = await fetchDataFromBrawlStars();

        res.render('vue', { data: stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

module.exports = router;
