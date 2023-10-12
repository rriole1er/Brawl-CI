
const axios = require('axios');
const url = require('url');

const fixieUrl = url.parse(process.env.FIXIE_URL || 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com');
const fixieAuth = fixieUrl.auth.split(':');
const apiKey = 'REDACTED_API_KEY';

async function fetchDataFromBrawlStarsLocal(playerTag) {

    try {
        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playerTag}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                Accept: 'application/json'
            }
        });
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { fetchDataFromBrawlStarsLocal };