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


app.post('/posts', async (req, res) => {
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

app.delete('/posts', async (req, res) => {
    try {
        const post = await models.post.findOneAndDelete({ _id: req.body.postId });
        console.log("Post deleted:", post);
        res.send("Post deleted successfully");
    } catch (error) {
        console.error("Error:", error);
    }
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

app.get('/likeEvents', async (req, res) => {
    try {
        const likeEvents = await models.likeEvent.find({ userId: req.body.userId });
        console.log("LikeEvents:", likeEvents);
        res.send(likeEvents);
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
});

app.get('/likeEvents/:eventId', async (req, res) => {
    try {
        const eventExists = await models.event.exists({ _id: req.params.eventId });
        if (!eventExists) {
            throw new Error("Event does not exist");
        }
        const likeEventCount = await models.likeEvent.countDocuments({ eventId: req.params.eventId });
        console.log("LikeEvent count:", likeEventCount);
        res.send({ eventFollowers: likeEventCount });
    } catch (error) {
        console.error("Error:", error);
        res.status(404).send({ error: error.message });
    }
});

app.delete('/likeEvent', async (req, res) => {
    try {
        const likeEvent = await models.likeEvent.findOneAndDelete({ eventId: req.body.eventId, userId: req.body.userId });
        console.log("LikeEvent deleted:", likeEvent);
        res.send(likeEvent);
    } catch (error) {
        console.error("Error:", error);
    }
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
