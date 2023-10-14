const {  fetchDataFromBrawlStarsLocal } = require('./apicall');
const { fetchDataFromBattleLog } = require('./apicall');

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

// ------------------- Récupération Trophées --------------------------

function extraireInfosBattlelog(battleItem, tagJoueur) {

    // Déterminez si c'est une bataille de type soloShowdown ou une autre
    let joueurs;
    if (battleItem.battle.mode === "soloShowdown") {
        joueurs = battleItem.battle.players;
    } else if (battleItem.battle.teams) {
        joueurs = battleItem.battle.teams.flat();
    } else {
        console.warn("Données de battle incomplètes pour:", battleItem.battleTime);
        return null;
    }

    return {
        battleTime: battleItem.battleTime,
        mode: battleItem.event.mode,
        rank: battleItem.battle.rank || battleItem.battle.result, // Utilisez rank ou result selon ce qui est disponible
        trophyChange: battleItem.battle.trophyChange,
        playerName: joueurs.find(player => player.tag === `#${tagJoueur}`).name,
        brawler: {
            name: joueurs.find(player => player.tag === `#${tagJoueur}`).brawler.name,
            trophies: joueurs.find(player => player.tag === `#${tagJoueur}`).brawler.trophies
        }
    };
}

async function obtenirBattleLog(tagJoueur) {
    const battlelog = await fetchDataFromBattleLog(tagJoueur);
    return battlelog.items.map(battleItem => extraireInfosBattlelog(battleItem, tagJoueur));
}

function ajouterDonneesAuJSON(donneesExistantes, nouvellesDonnees) {
    if (typeof donneesExistantes !== 'object' || donneesExistantes === null) {
        donneesExistantes = {};
    }

    nouvellesDonnees.forEach(bataille => {
        donneesExistantes[bataille.battleTime] = bataille;
    });

    return donneesExistantes;
}

async function mettreAJourFichierBattleLog(tagJoueur) {
    const maintenant = new Date();

    // Supprimer le fichier de la veille, s'il existe
    const hier = new Date(maintenant);
    hier.setDate(hier.getDate() - 1);
    const nomFichierHier = `public/js/battlelog${tagJoueur}_${hier.toISOString().split('T')[0]}.json`;
    if (fs.existsSync(nomFichierHier)) {
        fs.unlinkSync(nomFichierHier);
    }

    const nomFichier = `public/js/battlelog${tagJoueur}_${maintenant.toISOString().split('T')[0]}.json`;

    const nouvellesDonnees = await obtenirBattleLog(tagJoueur);

    let donneesExistantes = lireFichierJSON(nomFichier);

    const donneesMisesAJour = ajouterDonneesAuJSON(donneesExistantes, nouvellesDonnees);

    ecrireJSONDansFichier(nomFichier, donneesMisesAJour);
}

function fetchAndUpdateBattleLog() {
    Promise.all([
        //... autres fonctions
        mettreAJourFichierBattleLog("20GGQPVVL", 'public/js/battlelogLuc4gbox.json'),
        //... autres tags et noms de fichiers
    ]).then(() => {
        console.log("Les fichiers de battlelog ont été mis à jour.");
    }).catch((err) => {
        console.error("Erreur lors de la mise à jour des fichiers de battlelog:", err);
    });
}

fetchAndUpdateBattleLog()

module.exports = { fetchAndUpdateData, fetchAndUpdateBattleLog };