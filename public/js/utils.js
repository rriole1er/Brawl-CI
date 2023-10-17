  
const DataProcessor = require('./stat'); // Chemin vers la classe Stat
const path = require('path');
  
function loadDataPlayer(name) {
  
        var dataProcessor;

        if(name == "Remyto"){
            const filePath = path.join(__dirname, 'tropheesElRemyto.json'); //Chemin magique ?
            // Créez une instance de DataProcessor avec le chemin du fichier JSON
            dataProcessor = new DataProcessor(filePath);

        }   

        else if(name=="Luc4gbox") {
            const filePath = path.join(__dirname, 'tropheesLuc4gbox.json');
            // Créez une instance de DataProcessor avec le chemin du fichier JSON
            dataProcessor = new DataProcessor(filePath);

        }

        else{
            const filePath = path.join(__dirname, 'tropheesGirafeKool.json');
            // Créez une instance de DataProcessor avec le chemin du fichier JSON
            dataProcessor = new DataProcessor(filePath);
        }

        // Lisez les données du fichier JSON
        dataProcessor.readData();

        // Traitez les données pour obtenir les dernières captures de chaque jour
        const lastCaptures = dataProcessor.process();

        return dataProcessor.getDaysAndValues(lastCaptures);
}


module.exports = { loadDataPlayer };