const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

module.exports = {
  name: `ping`,
  description: `Xem ping của bot`,
  aliases: ["latency"],
  cooldown: 2,
  edesc: "Nhập lệnh này để xem Bot có thể phản hồi nhanh như thế nào đối với các đầu vào tin nhắn / lệnh của bạn!",
  execute(message, args, client) {
    //react with approve emoji
    message.react("✅");
    //send the Ping embed
    message.reply(new MessageEmbed().setColor("#F0EAD6").setTitle(":ping_pong: `" + client.ws.ping + "ms`"));
  }
}