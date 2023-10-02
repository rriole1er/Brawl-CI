const express = require('express');
const router = express.Router();

const { fetchDataFromBrawlStars } = require('../public/js/apicall'); // Importez la fonction depuis le module
const { fetchDataFromBrawlStarsLocal} = require('../public/js/apicall');

const NodeCache = require('node-cache'); // Utilisez un module de cache comme node-cache
const cache = new NodeCache();
const cacheKey = 'brawl-stars-data'; // Clé de cache pour les données Brawl Stars

const tag = 'VUGVJYUY'

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
            const stats = await fetchDataFromBrawlStars(tag);
            
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
        const stats = await fetchDataFromBrawlStarsLocal(tag);

        res.render('vue', { data: stats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

let lastRefreshed = null;

router.get('/refresh', (req, res) => {
    const now = Date.now();

    if (lastRefreshed && now - lastRefreshed < 5 * 60 * 1000) {  // 5 minutes en millisecondes
        return res.status(429).send("Trop de demandes. Veuillez attendre avant de rafraîchir à nouveau.");
    }

    lastRefreshed = now;
    cache.del(cacheKey);
    res.redirect('/remy/proxy');
});

module.exports = router;
