const {  fetchDataFromBrawlStarsLocal } = require('./apicall');
const { fetchDataFromBattleLog } = require('./apicall');

const fs = require('fs');

// ------------------- Récupération Trophées --------------------------


// Recupère les trophées d'un jour à partir du tag
async function obtenirTrophees(tagJoueur) {
    const stats = await fetchDataFromBrawlStarsLocal(tagJoueur);

    return stats.trophies;
}

// Fonction qui lit un json
function lireFichierJSON(nomFichier) {
    if (fs.existsSync(nomFichier)) {
        const donneesBrutes = fs.readFileSync(nomFichier, 'utf8');
        return JSON.parse(donneesBrutes);
    } else {
        return {};
    }
}

// Fonction qui ajoute des données sous un format specifique dans le fichier trophée.json
function ajouterDonneesAuJSON(donneesJSON, trophees) {
    const maintenant = new Date();
    const aujourdHui = `${maintenant.toISOString().split('T')[0]} ${maintenant.getHours()}:${maintenant.getMinutes()}`;
    donneesJSON[aujourdHui] = trophees;
    return donneesJSON;
}

// Fonction qui ecrit une chaine dans un json
function ecrireJSONDansFichier(nomFichier, donneesJSON) {
    const chaineDonnees = JSON.stringify(donneesJSON, null, 2);
    fs.writeFileSync(nomFichier, chaineDonnees);
}

// Fonction qui recupère les trophées, lit les données déja présents et ajoute
async function mettreAJourFichierTrophees(tagJoueur, nomFichier) {
    const trophées = await obtenirTrophees(tagJoueur);

    console.log(trophées);

    const donneesJSON = lireFichierJSON(nomFichier);

    const donneesMisesAJour = ajouterDonneesAuJSON(donneesJSON, trophées);

    console.log("données mis a jour",donneesMisesAJour);

    ecrireJSONDansFichier(nomFichier, donneesMisesAJour);
}

// Fonction qui mets a jour pour les 3 joueurs
function fetchAndUpdateData() {
    Promise.all([
        mettreAJourFichierTrophees("20GGQPVVL", 'public/js/tropheesLuc4gbox.json'),
        mettreAJourFichierTrophees("VUGVJYUY", 'public/js/tropheesElRemyto.json'),
        mettreAJourFichierTrophees("PRRRJG9", 'public/js/tropheesGirafeKool.json')
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

function ajouterDonneesAuJSON2(donneesExistantes, nouvellesDonnees) {
    if (typeof donneesExistantes !== 'object' || donneesExistantes === null) {
        donneesExistantes = {};
    }

    if (Array.isArray(nouvellesDonnees)) {
        nouvellesDonnees.forEach(bataille => {
            donneesExistantes[bataille.battleTime] = bataille;
        });
    } else {
        console.error("nouvellesDonnees n'est pas un tableau.");
    }

    return donneesExistantes;
}


// marche pas, ne supprime pas l'ancien battelog
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

    const donneesMisesAJour = ajouterDonneesAuJSON2(donneesExistantes, nouvellesDonnees);

    ecrireJSONDansFichier(nomFichier, donneesMisesAJour);
}

function fetchAndUpdateBattleLog() {
    Promise.all([
        //... autres fonctions
        mettreAJourFichierBattleLog("20GGQPVVL", 'public/js/battlelogLuc4gbox.json'),
        mettreAJourFichierBattleLog("VUGVJYUY", 'public/js/battleloElgRemyto.json'),
        mettreAJourFichierBattleLog("PRRRJG9", 'public/js/battlelogGirafeKool.json'),
        //... autres tags et noms de fichiers
    ]).then(() => {
        console.log("Les fichiers de battlelog ont été mis à jour.");
    }).catch((err) => {
        console.error("Erreur lors de la mise à jour des fichiers de battlelog:", err);
    });
}

module.exports = { fetchAndUpdateData, fetchAndUpdateBattleLog };