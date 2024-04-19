import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: Number,
    content: String,
    likes: Number,
    comments: Number,
});

const commentPostSchema = new Schema({
    id: Number,
    postId: Number,
    content: String,
    likes: Number,
    parentId: Number, 
});

const likePostSchema = new Schema({
    id: Number,
    postId: Number,
    userId: Number,
});

const likeEventSchema = new Schema({
    id: Number,
    eventId: Number,
    userId: Number,
});

const likeCommentSchema = new Schema({
    id: Number,
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
