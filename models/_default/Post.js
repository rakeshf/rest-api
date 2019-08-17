const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum : ['publish','blocked', 'un-publish'],
        default: 'un-publish'
    },
    user_email: {
        type: String,
        require: true
    },
    source_id: {
        type: String,
        require: true,
        default: 0
    },
    source_url: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        default: 0
    },
    moderated_by: {
        type: String,
        require: false 
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date
    }
});

module.exports = mongoose.model('Posts', PostSchema);