const filesystem = require('fs').promises;
const path = require('path');

const logsFilePath = path.join(__dirname, '../data/logs.json');

const getLogs = () => {
    return filesystem.readFile(logsFilePath, 'utf-8')
        .then((logsData) => JSON.parse(logsData))
        .catch ((error) => {
            throw new Error('Não foi possível ler o arquivo de logs!')
        })
}

module.exports = {
    getLogs
}
