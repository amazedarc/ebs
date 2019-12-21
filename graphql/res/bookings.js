/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-useless-catch */
const Booking = require('../../Models/booking');
const Event = require('../../Models/event');
const { bookingHandler, eventHandler } = require('./handlers');

module.exports = {
    bookings: async() => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return bookingHandler(booking);
            });
        } catch (err) {
            throw err;
        }
    },
    bookingEvent: async args => {
        try {
            const fetchedEvent = await Event.findOne({ _id: args.eventId });
            const booking = await new Booking({
                event: fetchedEvent,
                user: '5de667f5b05f0331e4e10c7d'
            });
            const result = await booking.save();
            return bookingHandler(result);
        } catch (err) {
            throw err;
        }
    },
    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = await eventHandler(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }
    }
};