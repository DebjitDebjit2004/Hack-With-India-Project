<<<<<<< HEAD
const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 2*60*60
    }
})

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = BlacklistToken;

=======
const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 2*60*60
    }
})

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = BlacklistToken;

>>>>>>> refs/remotes/origin/samir
