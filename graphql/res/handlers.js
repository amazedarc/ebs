/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-useless-catch */
const Event = require('./../../Models/event');
const User = require('./../../Models/user');
const { dateToString } = require('./../../helper/date');

const bookingHandler = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        event: singleEvent.bind(this, booking._doc.event),
        user: user.bind(this, booking._doc.user),
        createdAt: booking._doc.createdAt,
        updatedAt: booking._doc_updatedAt
    };
};
const eventHandler = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    };
};
const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return eventHandler(event);
        });
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await User.findById(userId);

        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    } catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return eventHandler(event);
    } catch (err) {
        throw err;
    }
};

// exports.user = user;
// exports.events = events;
exports.singleEvent = singleEvent;

exports.eventHandler = eventHandler;
exports.bookingHandler = bookingHandler;