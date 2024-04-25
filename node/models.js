import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'likePost' }],
    comments: Number,
    userId: Number,
    images: [{ type: Schema.Types.ObjectId, ref: 'image' }],
});

const commentPostSchema = new Schema({
    postId: Number,
    content: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'likeComment' }],
    parentId: Number, 
});

const likePostSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'post' },
    userId: Number,
});

likePostSchema.pre('save', async function(next) {
    try {
        await models.post.findOneAndUpdate(
            { _id: this.postId },
            { $push: { likes: this._id } },
            { new: true }
        );
        next();
    } catch (error) {
        next(error);
    }
});

const likeEventSchema = new Schema({
    eventId: Number,
    userId: Number,
});


const likeCommentSchema = new Schema({
    commentId: { type: Schema.Types.ObjectId, ref: 'commentPost' },
    userId: Number,
});


likeCommentSchema.pre('save', async function(next) {
    try {
        await models.commentPost.findOneAndUpdate(
            { _id: this.commentId },
            { $push: { likes: this._id } },
            { new: true }
        );
        next();
    } catch (error) {
        next(error);
    }
});

const imageSchema = new Schema({
    url: String,
    postId: Number,
});

const models = {
    post: mongoose.model("post", postSchema),
    commentPost: mongoose.model("commentPost", commentPostSchema),
    likePost: mongoose.model("likePost", likePostSchema),
    likeEvent: mongoose.model("likeEvent", likeEventSchema),
    likeComment: mongoose.model("likeComment", likeCommentSchema),
    image: mongoose.model("image", imageSchema),
};

export default models;
