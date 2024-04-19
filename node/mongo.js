import mongoose from "mongoose";
import models from "./models.js";
import minimist from "minimist";
import express from 'express';

const app = express();


const argv = minimist(process.argv.slice(2));
const host = argv.host || 'mongodb';

mongoose.connect('mongodb://root:root@' + host + ':27017/spottunes', { authSource: "admin" })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    const posts = [
        {
            content: "Hello World!",
            likes: [],
            comments: 0,
        },
        {
            content: "This is a post",
            likes: [],
            comments: 0,
        },
        {
            content: "This is another post",
            likes: [],
            comments: 0,
        },
    ];

for (const post of posts) {
    models.post.create(post);
    console.log("Post created");
}
