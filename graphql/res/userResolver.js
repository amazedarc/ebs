/* eslint-disable no-unused-expressions */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-useless-catch */
const bcrypt = require('bcryptjs');
const User = require('./../../Models/event');

module.exports = {
    createUsers: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });

            if (existingUser) {
                throw new Error('Email already exist');
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = await new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();

            return {...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    }
};