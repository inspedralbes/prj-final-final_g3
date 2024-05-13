import mongoose from "mongoose";
import models from "./models.js";
import minimist from "minimist";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const argv = minimist(process.argv.slice(2));
const host = argv.host || "mongodb";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

mongoose
  .connect(`mongodb://${mongoUser}:${mongoPassword}@${host}:27017/spottunes`, {
    authSource: "admin",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* POSTS */
/* Esta funcion es para guardar un post*/
app.post("/posts", async (req, res) => {
  const post = req.body;
  try {
    var createdPost = {
      content: post.content,
      likes: [],
      comments: 0,
      userId: post.userId,
      images: [],
    };
    res.send(await models.post.create(createdPost));
  } catch (error) {
    console.error("Error:", error);
  }
});

/* Esta funcion es para eliminar un post*/
app.delete("/posts", async (req, res) => {
  try {
    const post = await models.post.findOneAndDelete({ _id: req.query.postId });

    await models.likePost.deleteMany({ postId: post._id });

    console.log("Post deleted:", post);
    res.send("Post deleted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
});

/* Esta funcion es para recibir todos los posts de un usuario y su contenido*/
app.get("/posts", async (req, res) => {
  try {
    const posts = await models.post.find({ userId: req.query.userId });
    console.log("Posts:", posts);
    res.send(posts);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
});

/* EVENTS */
/* Esta funcion es para guardar el like de un evento*/

app.post("/likeEvent", async (req, res) => {
  try {
    const likeEvent = await models.likeEvent.create({
      eventId: req.body.eventId,
      userId: req.body.userId,
    });
    console.log("LikeEvent created:", likeEvent);
    res.send(likeEvent);
  } catch (error) {
    console.error("Error:", error);
  }
});

/* Esta funcion es para recibir los eventos que un usuario le ha dado like*/
app.get("/likeEvents", async (req, res) => {
  try {
    const likeEvents = await models.likeEvent.find({
      userId: req.query.userId,
    });
    console.log("LikeEvents:", likeEvents);
    res.send(likeEvents);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
});

/* Esta funcion es para recoger el numero de likes de un evento*/
app.get("/likeEvents/:eventId", async (req, res) => {
  try {
    const eventExists = await models.event.exists({
      _id: req.params.eventId,
    });
    if (!eventExists) {
      throw new Error("Event does not exist");
    }
    const likeEventCount = await models.likeEvent.countDocuments({
      eventId: req.params.eventId,
    });
    console.log("LikeEvent count:", likeEventCount);
    res.send({ eventFollowers: likeEventCount });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).send({ error: error.message });
  }
});
/* Esta funcion es para quitar el like de un evento cuando el usuario lo quita manualmente*/
app.delete("/likeEvent", async (req, res) => {
  try {
    const likeEvent = await models.likeEvent.findOneAndDelete({
      eventId: req.query.eventId,
      userId: req.query.userId,
    });
    console.log("LikeEvent deleted:", likeEvent);
    res.send(likeEvent);
  } catch (error) {
    console.error("Error:", error);
  }
});

/* LIKES */
/* Esta funcion es para guardar el like de un post hecho por un usuario */
app.post("/likePost", async (req, res) => {
  try {
    const likePost = await models.likePost.create({
      postId: req.body.postId,
      userId: req.body.userId,
    });
    console.log("LikePost created:", likePost);
    res.send(likePost);
  } catch (error) {
    console.error("Error:", error);
  }
});

/* Esta funcion es para recibir todos los post a los que un usuario le ha dado like*/
app.get("/likePosts", async (req, res) => {
  try {
    const likePosts = await models.likePost.find({
      userId: req.query.userId,
    });
    console.log("LikePosts:", likePosts);
    res.send(likePosts);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
});

/* Esta funcion es devolver cuantos likes tiene un post */
app.get("/likePosts/:postId", async (req, res) => {
  try {
    const postExists = await models.post.exists({ _id: req.params.postId });
    if (!postExists) {
      throw new Error("Post does not exist");
    }
    const likePostCount = await models.likePost.countDocuments({
      postId: req.params.postId,
    });
    console.log("LikePost count:", likePostCount);
    res.send({ postLikes: likePostCount });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).send({ error: error.message });
  }
});
/* Esta funcion es para cuando un usuario quiere quitar el like de un post */
app.delete("/likePost", async (req, res) => {
  try {
    const likePost = await models.likePost.findOneAndDelete({
      postId: req.query.postId,
      userId: req.query.userId,
    });

    // Remove the _id from the likes array of the post
    await models.post.updateOne(
      { _id: req.query.postId },
      { $pull: { likes: likePost._id } }
    );

    console.log("LikePost deleted:", likePost._id);
    res.send(likePost);
  } catch (error) {
    console.error("Error:", error);
  }
});

/* COMMENTS */
/* Esta funcion sirve para guardar los comentarios de los usuarios y tambien las respuestas a ellos*/
app.post("/comments", async (req, res) => {
  const comment = req.body;
  try {
    var createdComment = {
      postId: comment.postId,
      content: comment.content,
      likes: [],
      parentId: comment.parentId,
    };
    res.send(await models.commentPost.create(createdComment));
  } catch (error) {
    console.error("Error:", error);
  }
});

/* Esta funcion sirve para recibir todos los comentarios de un post */
app.get("/comments", async (req, res) => {
  try {
    const comments = await models.commentPost.find({
      postId: req.body.postId,
    });
    console.log("Comments:", comments);
    res.send(comments);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
});

/* Esta funcion sirve para recibir cuantos comentarios tiene un post */
app.get("/comments/:postId", async (req, res) => {
  try {
    const postExists = await models.post.exists({ _id: req.params.postId });
    if (!postExists) {
      throw new Error("Post does not exist");
    }
    const commentCount = await models.commentPost.countDocuments({
      postId: req.params.postId,
    });
    console.log("Comment count:", commentCount);
    res.send({ postComments: commentCount });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).send({ error: error.message });
  }
});

/* Esta funcion sirve para eliminar un comentario */
app.delete("/comments", async (req, res) => {
  try {
    const comment = await models.commentPost.findOneAndDelete({
      _id: req.query.commentId,
    });
    console.log("Comment deleted:", comment);
    res.send("Comment deleted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
});

/* LIKES A COMENTARIOS */

/* Guardar el like de un comentario */
app.post("/likeComment", async (req, res) => {
  try {
    const likeComment = await models.likeComment.create({
      commentId: req.body.commentId,
      userId: req.body.userId,
    });
    console.log("LikeComment created:", likeComment);
    res.send(likeComment);
  } catch (error) {
    console.error("Error:", error);
  }
});

/* Recibir todos los comentarios a los que un usuario le ha dado like */
app.get("/likeComments", async (req, res) => {
  try {
    const likeComments = await models.likeComment.find({
      userId: req.query.userId,
    });
    console.log("LikeComments:", likeComments);
    res.send(likeComments);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
});

/* Recibir cuantos likes tiene un comentario */
app.get("/likeComments/:commentId", async (req, res) => {
  try {
    const commentExists = await models.commentPost.exists({
      _id: req.params.commentId,
    });
    if (!commentExists) {
      throw new Error("Comment does not exist");
    }
    const likeCommentCount = await models.likeComment.countDocuments({
      commentId: req.params.commentId,
    });
    console.log("LikeComment count:", likeCommentCount);
    res.send({ commentLikes: likeCommentCount });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).send({ error: error.message });
  }
});

/* Eliminar el like de un comentario */
app.delete("/likeComment", async (req, res) => {
  try {
    const likeComment = await models.likeComment.findOneAndDelete({
      commentId: req.query.commentId,
      userId: req.query.userId,
    });
    console.log("LikeComment deleted:", likeComment);
    res.send(likeComment);
  } catch (error) {
    console.error("Error:", error);
  }
});

/* IMAGENES */

app.post("/images", async (req, res) => {
  const image = req.body;
  try {
    var createdImage = {
      url: image.url,
      postId: image.postId,
    };
    res.send(await models.image.create(createdImage));
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/images", async (req, res) => {
  try {
    const images = await models.image.find({ postId: req.query.postId });
    console.log("Images:", images);
    res.send(images);
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
});

app.delete("/images", async (req, res) => {
  try {
    const image = await models.image.findOneAndDelete({
      _id: req.query.imageId,
    });
    console.log("Image deleted:", image);
    res.send("Image deleted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
