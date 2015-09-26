'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    created_at: {type: Date, default: Date.now},
    topics: [
        {
            topic: String,
            description: String,
            category: String,
            created_at: {type: Date, default: Date.now}
        }
    ],
    posts: [
        {
            post: String,
            created_at: {type: Date, default: Date.now}
        }
    ],
    comments: [
        {
            comment: String,
            created_at: {type: Date, default: Date.now}
        }
    ]
});

UserSchema.path('username').required(true, 'User name cannot be blank');

mongoose.model('Users', UserSchema);