// routes/json.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const tropheesElRemyto = require('../public/js/tropheesElRemyto.json');
    const tropheesLuc4gbox = require('../public/js/tropheesLuc4gbox.json');
    const tropheesTristan = require('../public/js/tropheesGirafeKool.json');

    res.render('json', { tropheesElRemyto, tropheesLuc4gbox,tropheesTristan });
});

module.exports = router;