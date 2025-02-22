const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const applySecurityMiddleware = (app) => {
    // Use Helmet to set various HTTP headers for security
    app.use(helmet());

    // Rate limiting middleware to limit requests
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.'
    });
    app.use(limiter);
};

module.exports = applySecurityMiddleware;
