
const apiKey = ''; // last api key is not available 

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

async function fetchDataFromBattleLog(playerTag) {

    try {
        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${playerTag}/battlelog`, {
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

module.exports = { fetchDataFromBrawlStarsLocal, fetchDataFromBattleLog };
