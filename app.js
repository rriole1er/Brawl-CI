const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const mainRoutes = require('./routes/main'); // Importez le routeur principal
const apiRemyRoutes = require('./routes/apiRemy');   // Importez le routeur API
const apiLucasRoutes = require('./routes/apiLucas');   // Importez le routeur API


app.use(express.static(__dirname + '/src'));

app.set('view engine', 'ejs');

app.use('/', mainRoutes); // Utilisez le routeur principal pour les routes principales
app.use('/remy', apiRemyRoutes);  // Utilisez le routeur API pour les routes API
app.use('/lucas', apiLucasRoutes);  // Utilisez le routeur API pour les routes API

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});