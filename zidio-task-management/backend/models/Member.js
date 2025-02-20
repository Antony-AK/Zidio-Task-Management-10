const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    position: String,
    DOB: String,
    projects: Number,
    profile: String
});

module.exports = mongoose.model('Member', memberSchema);
