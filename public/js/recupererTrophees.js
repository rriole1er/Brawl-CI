const {  fetchDataFromBrawlStarsLocal } = require('./apicall');

const fetch = require('node-fetch');
const fs = require('fs');
const schedule = require('node-schedule');
const cron = require('cron');

async function obtenirTrophees(tagJoueur) {
    const stats = await fetchDataFromBrawlStarsLocal(tagJoueur);

    return stats.trophies;
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
    const maintenant = new Date();
    const aujourdHui = `${maintenant.toISOString().split('T')[0]} ${maintenant.getHours()}:${maintenant.getMinutes()}`;
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
        mettreAJourFichierTrophees("20GGQPVVL", 'public/js/tropheesLuc4gbox.json'),
        mettreAJourFichierTrophees("VUGVJYUY", 'public/js/tropheesElRemyto.json'),
        mettreAJourFichierTrophees("PRRRJG9 ", 'public/js/tropheesGirafeKool.json')
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