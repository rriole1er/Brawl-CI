const express = require('express');
const router = express.Router();
const { loadDataPlayer} = require('../public/js/utils');
const { fetchDataFromBrawlStarsLocal } = require('../public/js/apicall');
const { fetchDataFromBattleLog } = require('../public/js/apicall');
const fs = require('fs');


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
        const [values2 ] = loadDataPlayer("Luc4gbox");
        const [values3] = loadDataPlayer("Tristan");

        // Obtenez la date actuelle
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];

        // Générez le nom du fichier en utilisant la convention `battlelog_<HASHTAG>_<DATE>.json`

        const filename = `public/js/battlelog${tag}_${dateString}.json`;

        let jsonData = [];
        if (fs.existsSync(filename)) {
            try {
                jsonData = JSON.parse(fs.readFileSync(filename, 'utf8'));
            } catch (error) {
                console.error("Erreur lors de la lecture ou de l'analyse du fichier:", error);
            }
        }

        const battlesArray = Object.values(jsonData);

        // Calculez le nombre total de victoires
        let totalVictoires = battlesArray.filter(battle =>
            (battle.mode !== "soloShowdown" && battle.mode !== "duoShowdown" && battle.rank === "victory") ||
            (battle.mode === "soloShowdown" && battle.rank <= 4) ||
            (battle.mode === "duoShowdown" && battle.rank <= 2)
        ).length;

        // Calculez le pourcentage de victoire
        let pourcentageVictoire = (totalVictoires / battlesArray.length) * 100;

        res.render('vue', { data: stats,playerName:"remy", days :days, values: values, values3:values3, values2: values2,battlelog: battlelog, jsonData: jsonData, pourcentageVictoire: pourcentageVictoire });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});



module.exports = router;
