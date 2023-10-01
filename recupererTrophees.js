const fetch = require('node-fetch');
const fs = require('fs');

async function obtenirTrophees(tagJoueur) {
    const reponse = await fetch(`https://api.brawlstars.com/v1/players/${tagJoueur}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQ3ODRlOTJjLTk3YzctNDZhYi1hNmRhLTFiMjI2YTU1ZWQ2NiIsImlhdCI6MTY5NjE1NDE1Miwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODkuODEuMTQwLjU3IiwiODkuODQuMjAxLjIyIl0sInR5cGUiOiJjbGllbnQifV19.O_BWITirMh8Jhz--h1Gl34Jy4Ns3R2Uow9C45i3agSh58C6ZN65lFxG68JleMhVFA9lLYZulv1QOjIMUwYvAIA',
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
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQ3ODRlOTJjLTk3YzctNDZhYi1hNmRhLTFiMjI2YTU1ZWQ2NiIsImlhdCI6MTY5NjE1NDE1Miwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODkuODEuMTQwLjU3IiwiODkuODQuMjAxLjIyIl0sInR5cGUiOiJjbGllbnQifV19.O_BWITirMh8Jhz--h1Gl34Jy4Ns3R2Uow9C45i3agSh58C6ZN65lFxG68JleMhVFA9lLYZulv1QOjIMUwYvAIA',
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
