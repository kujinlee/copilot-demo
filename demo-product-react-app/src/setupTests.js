const fetchMock = require('jest-fetch-mock');
const { TextEncoder, TextDecoder } = require('util');

fetchMock.enableMocks();

// Polyfill for TextEncoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;