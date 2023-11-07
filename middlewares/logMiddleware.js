const { error } = require('console');
const filesystem = require('fs');
const { STATUS_CODES } = require('http');
const path = require('path');

const logMiddleware = (req, res, next) => {
    const newLog ={
        timestamp: new Date(),
        Protocol: req.protocol,
        method: req.method,
        host: req.hostname,
        url: req.url,
        status: res.status,
        params: req.params,
        ip: req.ip
    }

    const logFilePath = path.join(__dirname, '../data/logs.json');

    let existingLogs = [];

    try{
        existingLogs = JSON.parse(filesystem.readFileSync(logFilePath))
        
    } catch (error) {
        existingLogs = [];

    }

    existingLogs.push(newLog);

    filesystem.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2));

    next();

}

module.exports = logMiddleware;