import mongoose from "mongoose";
import models from "./models.js";
import minimist from "minimist";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import multer from "multer";
import sharp from "sharp";
import fs from "fs";

const app = express();
app.use(express.static("./imgs"));

const argv = minimist(process.argv.slice(2));
const host = argv.host || "mongodb";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const hostimgs = argv.host || "localhost";

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
      comments: [],
      userId: post.userId,
      image: post.image,
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
    await models.commentPost.deleteMany({ postId: post._id });

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

/* Esta funcion es para recibir un post en concreto */
app.get("/posts/:postId", async (req, res) => {
  try {
    const post = await models.post.findOne({ _id: req.params.postId });
    console.log("Post:", post);
    res.send(post);
  } catch (error) {
    console.error("Error:", error);
    res.status(404).send({ error: error.message });
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

app.get("/likeEvents/:eventId/followers", async (req, res) => {
  const page = req.query.p || 0;
  const followersperPage = 10;

  try {
    const likeEventFollowers = await models.likeEvent
      .find({
        eventId: req.params.eventId,
      })
      .skip(page * followersperPage)
      .limit(followersperPage);
    console.log("LikeEvent followers:", likeEventFollowers);
    res.send(likeEventFollowers);
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
      userId: comment.userId,
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
      postId: req.query.postId,
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

    await models.likeComment.deleteMany({ commentId: comment._id });
    await models.commentPost.deleteMany({ parentId: comment._id });

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
app.post("/uploadImage", upload.single("img"), async (req, res) => {
  fs.access("./imgs", (error) => {
    if (error) {
      fs.mkdirSync("./imgs");
    }
  });
  const { buffer, originalname } = req.file;
  const timestamp = new Date().toISOString();
  const link = `${timestamp}.png`;
  await sharp(buffer)
    .png({ quality: 60 })
    .toFile("./imgs/" + link);
  return res.json({ link });
});

app.post("/chat", async (req, res) => {
  try {
    let chatExists = await models.chat.findOne({
      $or: [
        { user_id: req.body.user_id, contact_id: req.body.contact_id },
        { user_id: req.body.contact_id, contact_id: req.body.user_id },
      ],
    });

    if (chatExists != null) {
      let messages;
      try {
        messages = models.message
          .find({ chat_id: chatExists._id })
          .limit(45)
          .sort({ sent_at: -1 });
        return res.json({
          chatExists: chatExists,
          messages: messages,
        });
      } catch (error) {
        res.json({ chatExists: chatExists });
      }
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/chats", async (req, res) => {
  console.log("req.query.user_id:", req.query.user_id);
  try {
    const chats = await models.chat
      .find({
        $or: [
          { user_id: req.query.user_id },
          { contact_id: req.query.user_id },
        ],
      })
      .lean();
    console.log("Chats:", chats);
    if (chats.length !== 0) {
      const chatsWithMessageCount = await Promise.all(
        chats.map(async (chat) => {
          const messageCount = await models.message.countDocuments({
            chat_id: chat._id,
            state: { $in: ["enviado", "recibido"] },
            user_id: { $ne: req.query.user_id },
          });
          console.log("Message count:", messageCount);
          return {
            ...chat,
            messageCount,
          };
        })
      );
      console.log("Chats with message count:", chatsWithMessageCount);

      res.send(chatsWithMessageCount);
    } else {
      res.send([]);
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
});

app.post("/message", async (req, res) => {
  const message = req.body;
  try {
    let chatId = message.chat_id;

    if (chatId != null) {
      let chatExists = await models.chat.findOne({
        $or: [
          { user_id: req.body.user_id, contact_id: req.body.contact_id },
          { user_id: req.body.contact_id, contact_id: req.body.user_id },
        ],
      });

      if (chatExists == null) {
        const newChat = await models.chat.create({
          name: message.nameChat || `${message.user_id}-${message.contact_id}`,
          user_id: message.user_id,
          contact_id: message.contact_id,
          accepted: false,
        });

        chatId = newChat._id;
      } else {
        chatId = chatExists._id;
      }
    }

    var createdMessage = {
      chat_id: chatId,
      user_id: message.user_id,
      content: message.content,
      sent_at: message.sent_at,
      read_at: message.read_at,
      state: message.state || "enviado",
    };
    res.send(await models.message.create(createdMessage));
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await models.message
      .find({ chat_id: req.query.chat_id })
      .limit(45)
      .sort({ sent_at: -1 });
    console.log("Messages:", messages);
    res.send(messages);
  } catch (error) {
    console.error("Error:", error);
    res.send([]);
  }
});

app.get("/get10messages", async (req, res) => {
  try {
    const messages = await models.message
      .find({
        chat_id: req.query.chat_id,
        _id: { $lt: req.query.message_id },
      })
      .limit(45)
      .sort({ sent_at: -1 });
    console.log("Messages:", messages);
    res.send(messages);
  } catch (error) {
    console.error("Error:", error);
    res.send([]);
  }
});

app.get("/get10messages", async (req, res) => {
  try {
    const chatId = req.query.chat_id;
    const messageId = req.query.message_id;

    const prioritizedMessages = await models.message
      .find({
        chat_id: chatId,
        $or: [{ state: "recibido" }, { state: "enviado" }],
        _id: { $lt: messageId },
      })
      .sort({ sent_at: -1 });

    const lastMessageId =
      prioritizedMessages.length > 0
        ? prioritizedMessages[prioritizedMessages.length - 1]._id
        : messageId;

    const additionalMessages = await models.message
      .find({
        chat_id: chatId,
        _id: { $lt: lastMessageId },
      })
      .limit(45)
      .sort({ sent_at: -1 });

    const messageIds = new Set(
      prioritizedMessages.map((msg) => msg._id.toString())
    );
    const combinedMessages = [...prioritizedMessages];

    additionalMessages.forEach((msg) => {
      if (!messageIds.has(msg._id.toString())) {
        combinedMessages.push(msg);
        messageIds.add(msg._id.toString());
      }
    });

    console.log("Messages:", finalMessages);
    res.send(finalMessages);
  } catch (error) {
    console.error("Error:", error);
    res.send([]);
  }
});

app.get("/getMessagesNotReceived", async (req, res) => {
  try {
    const messageCount = await models.message.countDocuments({
      chat_id: req.query.chat_id,
      state: "enviado",
      user_id: { $ne: req.query.user_id },
    });
    res.send({ count: messageCount });
  } catch (error) {
    console.error("Error:", error);
    res.send([]);
  }
});

app.put("/markMessagesAsReceived", async (req, res) => {
  try {
    const chatId = req.body.chat_id;
    const userId = req.body.user_id;

    console.log(`chat_id: ${chatId}`);

    const result = await models.message.updateMany(
      { chat_id: chatId, state: "enviado", user_id: { $ne: userId } },
      { $set: { state: "recibido" } }
    );

    res.send("Messages marked as received");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error marking messages as received");
  }
});

app.put("/markMessagesAsRead", async (req, res) => {
  try {
    const chatId = req.body.chat_id;
    const userId = req.body.user_id;

    console.log(`chat_id: ${chatId}`);

    const result = await models.message.updateMany(
      { chat_id: chatId, state: "recibido", user_id: { $ne: userId } },
      { $set: { state: "leido" } }
    );

    res.send("Messages marked as read");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error marking messages as read");
  }
});

app.get("/lastMessage", async (req, res) => {
  try {
    const message = await models.message
      .findOne({ chat_id: req.query.chat_id })
      .sort({ sent_at: -1 });
    console.log("Messages:", message);
    res.send(message);
  } catch (error) {
    console.error("Error:", error);
    res.send("Error:", error);
  }
});

app.get("/getMessagesNotReceived", async (req, res) => {
  try {
    const messageCount = await models.message.countDocuments({
      chat_id: req.query.chat_id,
      state: "enviado",
      user_id: { $ne: req.query.user_id },
    });
    res.send({ count: messageCount });
  } catch (error) {
    console.error("Error:", error);
    res.send([]);
  }
});

app.put("/markMessagesAsReceived", async (req, res) => {
  try {
    const chatId = req.body.chat_id;
    const userId = req.body.user_id;

    console.log(`chat_id: ${chatId}`);

    const result = await models.message.updateMany(
      { chat_id: chatId, state: "enviado", user_id: { $ne: userId } },
      { $set: { state: "recibido" } }
    );

    res.send("Messages marked as received");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error marking messages as received");
  }
});

app.put("/markMessagesAsRead", async (req, res) => {
  try {
    const chatId = req.body.chat_id;
    const userId = req.body.user_id;

    console.log(`chat_id: ${chatId}`);

    const result = await models.message.updateMany(
      { chat_id: chatId, state: "recibido", user_id: { $ne: userId } },
      { $set: { state: "leido" } }
    );

    res.send("Messages marked as read");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error marking messages as read");
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
