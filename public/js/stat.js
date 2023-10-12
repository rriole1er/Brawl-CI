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
            var litteralMonth ="";

            const day = date.split('-')[2];
            const month = parseInt(date.split('-')[1]);

            switch(month){
                case 1 :
                    litteralMonth="Jan " +day;
                    break;
                case 2 :
                    litteralMonth="Fev " +day;
                    break;
                case 3 :
                    litteralMonth="Mars "+day;
                    break;
                case 4 :
                    litteralMonth="Avr "+day;
                    break;
                case 5 :
                    litteralMonth="Mai "+day;
                    break;
                case 6 :
                    litteralMonth="Juin "+day;
                    break;
                case 7 :
                    litteralMonth="Juil "+day;
                    break;
                case 8 :
                    litteralMonth="Aou "+day;
                    break;
                case 9 :
                    litteralMonth="Sep "+day;
                    break;
                case 10 :
                    litteralMonth="Oct "+day;
                    break;
                case 11 :
                    litteralMonth="Nov "+day;
                    break;
                case 12 :
                    litteralMonth="Dec "+day;
                    break;

                    
            }

            days.push(litteralMonth);
            values.push(value);
        }

        return [days, values];
        
    }
}

module.exports = DataProcessor;