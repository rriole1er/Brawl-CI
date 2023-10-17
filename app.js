const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cron = require('node-cron');
const bodyParser = require('body-parser'); // Importez body-parser


const { fetchAndUpdateData } = require('./public/js/recupererTrophees');
const { fetchAndUpdateBattleLog } = require('./public/js/recupererTrophees');

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
const ejs = require('ejs');
const mainRoutes = require('./routes/main'); // Importez le routeur principal
const apiRemyRoutes = require('./routes/apiRemy');   // Importez le routeur API
const apiLucasRoutes = require('./routes/apiLucas');   // Importez le routeur API
const apiTristanRoutes = require ('./routes/apiTristan'); 
const apiRandomRoutes = require ('./routes/apiRandom'); 

const json = require('./routes/json');   // Importez le routeur API


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', mainRoutes); // Utilisez le routeur principal pour les routes principales
app.use('/remy', apiRemyRoutes);  // Utilisez le routeur API pour les routes API
app.use('/lucas', apiLucasRoutes);  // Utilisez le routeur API pour les routes API
app.use('/tristan', apiTristanRoutes);  // Utilisez le routeur API pour les routes API
app.use('/random', apiRandomRoutes);  // Utilisez le routeur API pour les routes API
app.use('/json', json);  // Utilisez le routeur API pour les routes API

cron.schedule('0 */1 * * *', fetchAndUpdateData);
cron.schedule('*/30 * * * * *', fetchAndUpdateBattleLog);