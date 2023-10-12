const express = require('express');
const router = express.Router();

const { fetchDataFromBrawlStarsLocal } = require('../public/js/apicall');
const DataProcessor = require('../public/js/stat'); // Chemin vers la classe Stat

const tag = 'VUGVJYUY'

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

        // Créez une instance de DataProcessor avec le chemin du fichier JSON
        const dataProcessor = new DataProcessor('./public/js/tropheesElRemyto.json');

        // Lisez les données du fichier JSON
        dataProcessor.readData();

        // Traitez les données pour obtenir les dernières captures de chaque jour
        const lastCaptures = dataProcessor.process();

        const [days, values ] = dataProcessor.getDaysAndValues(lastCaptures);

        console.log(days)

        console.log(days.toString())

        res.render('vue', { data: stats,playerName:"remy", days :days, values: values });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});


module.exports = router;
