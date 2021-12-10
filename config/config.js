require('dotenv').config()
const log4js = require('log4js');

const { 
    PORT,
    FBCLIENTID, 
    FBCLIENTSECRET,
    MODE
} = process.env;

log4js.configure({
    appenders: {
        everything: { type: 'file', filename: 'logs/everything.log' },
        warnings: { type: 'file', filename: 'logs/warn.log' },
        errors: { type: 'file', filename: 'logs/error.log' },
        warning_filter: { type: 'logLevelFilter', appender: 'warnings', level: 'warn', maxLevel: 'warn' },
        error_filter: { type: 'logLevelFilter', appender: 'errors', level: 'error', maxLevel: 'error' },
        consoleAppender: { type: 'console' }
    },
    categories: {
        default: { appenders: ['warning_filter', 'error_filter', 'everything', 'consoleAppender' ], level: 'info' }
    }
});

const logger = log4js.getLogger();

module.exports = {
    PORT,
    FBCLIENTID, 
    FBCLIENTSECRET,
    MODE,
    logger
}