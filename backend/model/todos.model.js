const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todosSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('todos', todosSchema);
