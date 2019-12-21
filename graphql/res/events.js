/* eslint-disable no-shadow */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-useless-catch */
const Event = require('../../Models/event');
const User = require('../../Models/user');
const { dateToString } = require('../../helper/date');
const { eventHandler } = require('./handlers');

module.exports = {
    events: async() => {
        // return events;
        try {
            const events = await Event.find();

            return events.map(event => {
                //return {...event._doc, _id: event._doc._id.toString() };
                return eventHandler(event);
            });
        } catch (err) {
            throw err;
        }
    },
    createEvents: async args => {
        try {
            const event = await new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: dateToString(args.eventInput.date),
                creator: '5de667f5b05f0331e4e10c7d'
            });

            const result = await event.save();
            const createdEvent = {
                ...result._doc,
                _id: event.id,
                date: dateToString(event._doc.date),
                creator: result._doc.creator
            };
            const user = await User.findById('5de667f5b05f0331e4e10c7d');

            if (!user) {
                throw new Error('User not found');
            }
            user.createdEvents.push(event);
            await user.save();
            return createdEvent;
        } catch (err) {
            throw err;
        }
    }
};