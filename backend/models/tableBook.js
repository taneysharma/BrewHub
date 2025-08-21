const mongoose = require('mongoose');

const tableBookSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    numberOfPeople: { type: String },
    date: { type: Date },
    guest: { type: Number},
    time: { type: String },
    message: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
});

const TableBook = mongoose.model('TableBook', tableBookSchema);

module.exports = TableBook;