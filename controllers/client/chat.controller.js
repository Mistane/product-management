const Chat = require("../.././models/chat.model");
const User = require("../.././models/user.model");

class chatControllers {
  //[GET] /chat

  async index(req, res) {
    _io.once("connection", (socket) => {
      socket.on("CLIENT_SEND_MESSAGE", async (data) => {
        const newChat = new Chat(data);
        await newChat.save();
        const user = await User.findOne({ _id: data.user_id }).select(
          "fullName",
        );
        newChat.fullName = user.fullName;
        console.log(newChat);
        _io.emit("SERVER_RETURN_MESSAGE", {
          content: newChat.content,
          user_id: newChat.user_id,
          fullName: user.fullName,
        });
      });
    });

    //lay data tu database
    const chats = await Chat.find({});
    for (const chat of chats) {
      const user = await User.findOne({ _id: chat.user_id });
      chat.fullName = user.fullName;
    }

    res.render("./client/pages/chat/index", { chats });
  }
}
module.exports = new chatControllers();
