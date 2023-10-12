const fs = require('fs');

class DataProcessor {
    constructor(jsonFilePath) {
        this.jsonFilePath = jsonFilePath;
        this.data = null;
    }

    readData() {
        // Lisez le contenu du fichier JSON
        const jsonData = fs.readFileSync(this.jsonFilePath, 'utf-8');

        // Parsez le contenu JSON en un objet JavaScript
        this.data = JSON.parse(jsonData);
    }

    process() {
        if (!this.data) {
            console.error('Les données n\'ont pas été lues. Utilisez la méthode "readData" pour lire les données JSON.');
            return;
        }

        // Créez un objet pour stocker la dernière capture de chaque jour
        const lastCapturesByDay = {};

        for (const timestamp in this.data) {
            if (this.data.hasOwnProperty(timestamp)) {
                const date = timestamp.split(' ')[0];
                const value = this.data[timestamp];

                // Si la date n'existe pas dans lastCapturesByDay ou si le timestamp est plus récent, mettez à jour la valeur
                if (!lastCapturesByDay[date] || timestamp > lastCapturesByDay[date].timestamp) {
                    lastCapturesByDay[date] = {
                        timestamp,
                        value,
                    };
                }
            }
        }

        // Convertissez lastCapturesByDay en un tableau d'objets
        const lastCapturesArray = Object.values(lastCapturesByDay);

        return lastCapturesArray;
    }

    getDaysAndValues(captures) {

        if (!captures || captures.length === 0) {
            console.error('Le tableau de captures est vide.');
            return;
        }

        const days = [];
        const values = [];

        for (const capture of captures) {
            const timestamp = capture.timestamp;
            const date = timestamp.split(' ')[0];
            const value = capture.value;
            const day = parseInt(date.split('-')[2]);

            days.push(day);
            values.push(value);

            
        }

        return [days, values];
        
    }
}

module.exports = DataProcessor;