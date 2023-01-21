const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        max: 255
    },
    path: {
        type: String,
        required: true,
        max: 255
    },
    thumbnail: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    order: {
        type: Number,
        default: 0,
    },
    link: {
        type: String,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('customers', customerSchema);