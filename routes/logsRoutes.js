const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController')

router.get ('/', (req, res) => {
    logsController.getLogs()
        .then ((logsData) => res.json(logsData))
        .catch ((error) => res.status(500).send('Erro ao obter logs'))
})

module.exports = router;


