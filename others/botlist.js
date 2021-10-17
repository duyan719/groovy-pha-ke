const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

module.exports = {
  name: `botlist`,
  description: `Cung cấp cho bạn danh sách của Bot`,
  aliases: [],
  cooldown: 3,
  edesc: "Gõ lệnh này để xem tất cả Máy chủ danh sách Bot nơi bot đang hoạt động. Hãy bình chọn ở đó UwU",
  execute(message, args, client) {
    //react with approve emoji
    message.react("✅");
    //send the botlist embed
    message.reply(new MessageEmbed().setColor("#F0EAD6")
    .setTitle("Đây là danh sách cho tất cả các danh sách Bot mà Bot này có mặt!")
   .addField("top.gg", "https://top.gg/bot/767885987740254291")
    .addField("Matrixbots","https://www.matrixbots.xyz/bots/767885987740254291/")
    .addField("bots.ondiscord","https://bots.ondiscord.xyz/bots/767885987740254291")
    .addField("discordbotlist","https://discordbotlist.com/bots/harmony")
    .addField("discordextremelist","https://discordextremelist.xyz/en-US/bots/767885987740254291")
    );

  }
}