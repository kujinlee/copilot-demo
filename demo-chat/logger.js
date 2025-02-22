const winston = require('winston');
const MockDatadogTransport = require('./transports/MockDatadogTransport');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new MockDatadogTransport()
    ]
});

module.exports = logger;
