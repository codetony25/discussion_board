'use strict';

var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
    username: String,
    topic: String,
    description: String,
    category: String,
    created_at: {type: Date, default: Date.now},
    posts: [
        {
            postUsername: String,
            post: String,
            postUpvote: {type: Number, default: 0},
            postDownvote: {type: Number, default: 0},
            created_at: {type: Date, default: Date.now},
            comments:  [
                {
                    commentUsername: String,
                    comment: String,
                    created_at: {type: Date, default: Date.now}
                }
            ]          
        }
    ]

});

TopicSchema.path('username').required(true, 'User name cannot be blank');

mongoose.model('Topics', TopicSchema);