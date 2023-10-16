const express = require('express');
const router = express.Router();
const { loadDataPlayer} = require('../public/js/utils');
const { fetchDataFromBrawlStarsLocal } = require('../public/js/apicall');
const { fetchDataFromBattleLog } = require('../public/js/apicall');

const tag = 'VUGVJYUY'

// La route '/' pour récupérer les données localement
router.get('/', async (req, res) => {
    try {
        // Utilisez votre fonction fetchDataFromBrawlStars pour récupérer les données sans utiliser le proxy
        const stats = await fetchDataFromBrawlStarsLocal(tag);
        const battlelog = await fetchDataFromBattleLog(tag);
        // Définissez le critère de filtrage en fonction de la requête de l'utilisateur (par défaut sur "trophies")
        const filterCriteria = req.query.filter || 'trophies';

        if (filterCriteria === 'trophies') {
            // Triez par trophées décroissantes
            stats.brawlers.sort((a, b) => b.trophies - a.trophies);
        } else if (filterCriteria === 'highestTrophies') {
            // Triez par les meilleurs trophées décroissantes
            stats.brawlers.sort((a, b) => b.highestTrophies - a.highestTrophies);
        }

        // Filtrer les brawlers par nom si un terme de recherche est présent
        const searchTerm = req.query.search;
        if (searchTerm) {
            stats.brawlers = stats.brawlers.filter(brawler => {
                return brawler.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
        }

        const [days, values ] = loadDataPlayer("Remyto");
        const [days2, values2 ] = loadDataPlayer("Luc4gbox");


        res.render('vue', { data: stats,playerName:"remy", days :days, values: values, values2: values2,battlelog: battlelog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});



module.exports = router;
