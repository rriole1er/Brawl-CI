const express = require('express');
const router = express.Router();
const { loadDataPlayer} = require('../public/js/utils');
const { fetchDataFromBrawlStarsLocal } = require('../public/js/apicall');

const tag = 'PRRRJG9'

// La route '/' pour récupérer les données localement
router.get('/', async (req, res) => {
    try {
        // Utilisez votre fonction fetchDataFromBrawlStars pour récupérer les données sans utiliser le proxy
        const stats = await fetchDataFromBrawlStarsLocal(tag);

        // Définissez le critère de filtrage en fonction de la requête de l'utilisateur (par défaut sur "trophies")
        const filterCriteria = req.query.filter || 'trophies';

        if (filterCriteria === 'trophies') {
            // Triez par trophées décroissantes
            stats.brawlers.sort((a, b) => b.trophies - a.trophies);
        } else if (filterCriteria === 'highestTrophies') {
            // Triez par les meilleurs trophées décroissantes
            stats.brawlers.sort((a, b) => b.highestTrophies - a.highestTrophies);
        }

        const [days, values ] = loadDataPlayer("Remyto");
        const [days2, values2 ] = loadDataPlayer("Luc4gbox");


        res.render('vue', { data: stats,playerName:"Tristan", days :days, values: values, values2: values2 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});


module.exports = router;
