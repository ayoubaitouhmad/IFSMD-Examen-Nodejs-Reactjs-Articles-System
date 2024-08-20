const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

// Custom log format similar to Laravel
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Determine environment
const env = process.env.NODE_ENV || 'development';

// Create logger instance
const logger = createLogger({
    format: combine(
        timestamp(),
        colorize(),
        logFormat
    ),
    transports: [
        new transports.Console(), // Logs to console
        new DailyRotateFile({
            filename: `logs/${env}-%DATE%.log`, // Environment-specific log file
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
        })
    ],
    level: env === 'development' ? 'debug' : 'info', // More verbose logging in development
});

// Export the logger instance
module.exports = logger;
