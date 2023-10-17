const express = require('express');
const router = express.Router();
const { fetchDataFromBrawlStarsLocal } = require('../public/js/apicall');
const { fetchDataFromBattleLog } = require('../public/js/apicall');


/*

// La route '/' pour récupérer les données localement
router.get('/', async (req, res) => {

    res.render('form');

});

// La route '/' pour récupérer les données localement
router.post('/', async (req, res) => {

    const tag = req.body.tag 

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


        res.render('vue_random', { data: stats,battlelog: battlelog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
});

*/

router.get('/tag', (req, res) => {
    res.render('form'); // Affichez le formulaire de saisie du tag
  });

router.get('/player/:tag', async (req, res) => {
    try {
      const tag = req.params.tag;

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

      res.render('vue_random', { data: stats, battlelog: battlelog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    }
  });

  router.get('/form', (req, res) => {
    res.render('form'); // Affichez le formulaire de saisie du tag
  });
  
  router.post('/form', async (req, res) => {
    
    try {
        const tag = req.body.tag;
  
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
  
        res.render('vue_random', { data: stats, battlelog: battlelog });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
      }


  });


module.exports = router;
