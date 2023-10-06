const express = require('express');
const router = express.Router();

const { fetchDataFromBrawlStars } = require('../public/js/apicall'); // Importez la fonction depuis le module
const { fetchDataFromBrawlStarsLocal } = require('../public/js/apicall');
const fs = require('fs');

const NodeCache = require('node-cache'); // Utilisez un module de cache comme node-cache
const cache = new NodeCache();
const cacheKey = 'brawl-stars-data'; // Clé de cache pour les données Brawl Stars

const tag = '20GGQPVVL'

// Lisez le contenu du fichier JSON
const jsonData = fs.readFileSync('./public/js/tropheesLuc4gbox.json', 'utf-8');

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

        // Lisez le contenu du fichier JSON
        const jsonData = fs.readFileSync('./public/js/tropheesLuc4gbox.json', 'utf-8');

        // Parsez le contenu JSON en un objet JavaScript
        const jsonObject = JSON.parse(jsonData);
        // Extraire les dates (jours) et les valeurs des trophées
        const dates = Object.keys(jsonObject);
        const valeursTrophees = Object.values(jsonObject);


        res.render('vue', { data: stats, playerName: "lucas",valeursTrophees:valeursTrophees,dates:dates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});


module.exports = router;