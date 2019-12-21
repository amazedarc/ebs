const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'email is akways required']
    },
    password: {
        type: String,
        required: [true, 'password is always required']
    },
    createdEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});
const User = mongoose.model('User', userSchema);
module.exports = User;