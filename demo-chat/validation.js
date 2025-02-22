const validateMessage = (message) => {
    if (typeof message !== 'string' || message.trim() === '') {
        throw new Error('Invalid message');
    }
};

module.exports = { validateMessage };
