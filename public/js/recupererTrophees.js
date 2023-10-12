const { fetchDataFromBrawlStars, fetchDataFromBrawlStarsLocal } = require('./apicall');

const fetch = require('node-fetch');
const fs = require('fs');
const axios = require('axios');
const url = require('url');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const cacheKey = 'brawl-stars-data';
const schedule = require('node-schedule');
const cron = require('cron');

async function obtenirTrophees(tagJoueur) {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        // Si les données sont en cache, renvoyez-les sans faire de nouvelle requête
        console.log('Données en cache');
        return cachedData;
    } else {
        // Si les données ne sont pas en cache, récupérez-les depuis l'API Brawl Stars
        const stats = await fetchDataFromBrawlStarsLocal(tagJoueur);
        
        // Mettez les données en cache pour les prochaines 6 heures (ou votre délai souhaité)
        cache.set(cacheKey, stats, 6 * 60 * 60);
        
        return stats.trophies;
    }
}

function lireFichierJSON(nomFichier) {
    if (fs.existsSync(nomFichier)) {
        const donneesBrutes = fs.readFileSync(nomFichier, 'utf8');
        return JSON.parse(donneesBrutes);
    } else {
        return {};
    }
}

function ajouterDonneesAuJSON(donneesJSON, trophees) {
    const aujourdHui = new Date().toISOString().split('T')[0];
    donneesJSON[aujourdHui] = trophees;
    return donneesJSON;
}

function ecrireJSONDansFichier(nomFichier, donneesJSON) {
    const chaineDonnees = JSON.stringify(donneesJSON, null, 2);
    fs.writeFileSync(nomFichier, chaineDonnees);
}

async function mettreAJourFichierTrophees(tagJoueur, nomFichier) {
    const trophées = await obtenirTrophees(tagJoueur);
    const donneesJSON = lireFichierJSON(nomFichier);
    const donneesMisesAJour = ajouterDonneesAuJSON(donneesJSON, trophées);
    ecrireJSONDansFichier(nomFichier, donneesMisesAJour);
}

function fetchAndUpdateData() {
    Promise.all([
        mettreAJourFichierTrophees("20GGQPVVL", 'tropheesLuc4gbox.json'),
        mettreAJourFichierTrophees("VUGVJYUY", 'tropheesElRemyto.json')
    ]).then(() => {
        console.log("Les fichiers de trophées ont été mis à jour.");
    }).catch((err) => {
        console.error("Erreur lors de la mise à jour des fichiers de trophées:", err);
    });
}

/*
schedule.scheduleJob('10 0 * * *', function(){
    console.log('Mise à jour des données de trophées...');
    console.log('TEST');
});

const job = new cron.CronJob('0 10 0 * * *', function() {
    console.log('Mise à jour des données de trophées CRON...');
    console.log('TEST cron');
});

job.start();
*/

//fetchAndUpdateData();

module.exports = { fetchAndUpdateData };