const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'An event must have a title']
            // minlength: [5, 'An event title must have more than 5 characters'],
            // maxlength: [10, 'An event title must have less than 10 characters']
    },
    description: {
        type: String,
        require: [true, 'An event must have a description']
    },
    price: {
        type: Number,
        require: [true, 'An event must have a price']
    },
    date: {
        type: Date,
        require: [true, 'An event must have a date']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;