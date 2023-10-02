const fetch = require('node-fetch');
const fs = require('fs');

async function obtenirTrophees(tagJoueur) {
    const reponse = await fetch(`https://api.brawlstars.com/v1/players/${tagJoueur}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE5NGY3N2RjLTk2MWItNGZhYS05ZDI3LTU1YzQ3MGEwZGExZiIsImlhdCI6MTY5NjIzNTM1MSwic3ViIjoiZGV2ZWxvcGVyLzFkZGE3MmEzLTFmN2ItZGI4ZS0wMjBlLTk4ODM2ZTI5NzNhNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTQuMTczLjIyOS4yMDAiLCI1NC4xNzUuMjMwLjI1MiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.ON07d6jh1qNu64Dge6Nbvm4YOa3ZO6RePyhs_19GJBFEw3dts-PbQfkgEeDJgwDWrdw4LxvAAStQvIA6jpF6KQ',
            Accept: 'application/json'
        }
    });
    
    if (!reponse.ok) {
        console.error(`Erreur lors de la récupération des données pour le tag ${tagJoueur}. Code de statut : ${reponse.status}`);
        return null;
    }

    const donnees = await reponse.json();
    return donnees.trophies;
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

async function mettreAJourFichierTrophees() {
    const tagJoueur = "%2320GGQPVVL";
    const trophées = await obtenirTrophees(tagJoueur);
    const donneesJSON = lireFichierJSON('tropheesLuc4gbox.json');
    const donneesMisesAJour = ajouterDonneesAuJSON(donneesJSON, trophées);
    ecrireJSONDansFichier('tropheesLuc4gbox.json', donneesMisesAJour);
}

mettreAJourFichierTrophees();

async function obtenirTrophees2(tagJoueur) {
    const reponse = await fetch(`https://api.brawlstars.com/v1/players/${tagJoueur}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjE5NGY3N2RjLTk2MWItNGZhYS05ZDI3LTU1YzQ3MGEwZGExZiIsImlhdCI6MTY5NjIzNTM1MSwic3ViIjoiZGV2ZWxvcGVyLzFkZGE3MmEzLTFmN2ItZGI4ZS0wMjBlLTk4ODM2ZTI5NzNhNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTQuMTczLjIyOS4yMDAiLCI1NC4xNzUuMjMwLjI1MiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.ON07d6jh1qNu64Dge6Nbvm4YOa3ZO6RePyhs_19GJBFEw3dts-PbQfkgEeDJgwDWrdw4LxvAAStQvIA6jpF6KQ',
            Accept: 'application/json'
        }
    });
    
    if (!reponse.ok) {
        console.error(`Erreur lors de la récupération des données pour le tag ${tagJoueur}. Code de statut : ${reponse.status}`);
        return null;
    }

    const donnees = await reponse.json();
    return donnees.trophies;
}

function lireFichierJSON2(nomFichier) {
    if (fs.existsSync(nomFichier)) {
        const donneesBrutes = fs.readFileSync(nomFichier, 'utf8');
        return JSON.parse(donneesBrutes);
    } else {
        return {};
    }
}

function ajouterDonneesAuJSON2(donneesJSON, trophees) {
    const aujourdHui = new Date().toISOString().split('T')[0];
    donneesJSON[aujourdHui] = trophees;
    return donneesJSON;
}

function ecrireJSONDansFichier2(nomFichier, donneesJSON) {
    const chaineDonnees = JSON.stringify(donneesJSON, null, 2);
    fs.writeFileSync(nomFichier, chaineDonnees);
}

async function mettreAJourFichierTrophees2() {
    const tagJoueur = "%23VUGVJYUY";
    const trophées = await obtenirTrophees2(tagJoueur);
    const donneesJSON = lireFichierJSON2('tropheesElRemyto.json');
    const donneesMisesAJour = ajouterDonneesAuJSON2(donneesJSON, trophées);
    ecrireJSONDansFichier2('tropheesElRemyto.json', donneesMisesAJour);
}

mettreAJourFichierTrophees2();
