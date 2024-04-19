import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: String,
    likes: Number,
    comments: Number,
});

const commentPostSchema = new Schema({
    postId: Number,
    content: String,
    likes: Number,
    parentId: Number, 
});

const likePostSchema = new Schema({
    postId: Number,
    userId: Number,
});

const likeEventSchema = new Schema({
    eventId: Number,
    userId: Number,
});

const likeCommentSchema = new Schema({
    commentId: Number,
    userId: Number,
});

const models = {
    post: mongoose.model("post", postSchema),
    commentPost: mongoose.model("commentPost", commentPostSchema),
    likePost: mongoose.model("likePost", likePostSchema),
    likeEvent: mongoose.model("likeEvent", likeEventSchema),
    likeComment: mongoose.model("likeComment", likeCommentSchema),
};

export default models;
