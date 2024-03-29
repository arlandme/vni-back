const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
        max: 255
    },
    summary: {
        type: String,
        required: true,
        max: 555
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
    content: {
        type: String,
        require: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    createdId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    updatedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('services', serviceSchema);