/* eslint-disable node/no-unsupported-features/es-syntax */
const authResolver = require('./userResolver');
const bookingResolver = require('./bookings');
const eventResolver = require('./events');

const rootResolver = {...authResolver, ...bookingResolver, ...eventResolver };

module.exports = rootResolver;