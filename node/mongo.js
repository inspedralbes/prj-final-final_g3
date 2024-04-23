import mongoose from "mongoose";
import models from "./models.js";
import minimist from "minimist";
import express from 'express';

const app = express();

const argv = minimist(process.argv.slice(2));
const host = argv.host || 'mongodb';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://root:root@' + host + ':27017/spottunes', { authSource: "admin" })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


const createLike = async (Like) => {
    try {
        const createdLike = await models.likePost.create({ postId: Like.postId, userId: Like.userId });
        console.log("Like created:", createdLike);
    } catch (error) {
        console.error("Error:", error);
    }
}


app.post('/createPosts', async (req, res) => {
    const post = req.body;
    try {
        var createdPost = {
            content: post.content,
            likes: [],
            comments: 0,
            userId: post.userId,
        };
        res.send(await models.post.create(createdPost));
    } catch (error) {
        console.error("Error:", error);
    }
});

app.post('/createLike', (req, res) => {
    createLike(req.body);
    res.send('Comment created');
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await models.post.find({ userId: req.body.userId});
        console.log("Posts:", posts);
        res.send(posts);
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
});

app.post('/likeEvent', async (req, res) => {
    try {
        const likeEvent = await models.likeEvent.create({ eventId: req.body.eventId, userId: req.body.userId });
        console.log("LikeEvent created:", likeEvent);
        res.send(likeEvent);
    } catch (error) {
        console.error("Error:", error);
    }
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
