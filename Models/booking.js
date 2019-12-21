const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;