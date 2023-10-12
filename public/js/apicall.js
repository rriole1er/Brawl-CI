
const axios = require('axios');
const url = require('url');

const fixieUrl = url.parse(process.env.FIXIE_URL || 'http://fixie:kmzzVSUwFDuEsju@velodrome.usefixie.com');
const fixieAuth = fixieUrl.auth.split(':');
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFlNGNkYjFjLTk5NGUtNGI3OS1iOTU0LWM5NDdkMDRiN2RhYiIsImlhdCI6MTY5NjI0MzM0MCwic3ViIjoiZGV2ZWxvcGVyL2NiYmIwMjA0LWNlNWUtY2UwMS1kMDAzLTIzNDgzZjFhNzg3MyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiODkuODEuMTQwLjU3IiwiODkuODQuMjAxLjIyIiwiNTQuMTczLjIyOS4yMDAiLCI1NC4xNzUuMjMwLjI1MiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.iMye8z_CTbpWMtnFEiJXrrZx-xXJfDeB5sS7fTVI31Qp9Jwj1-cbs88hfGSVZrNsxq8h0ExZYGrT_d3w4IJngQ';

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