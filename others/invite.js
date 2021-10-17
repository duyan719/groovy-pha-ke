const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Mời bot vào máy chủ của bạn. ",
  execute(message) {

    let inviteEmbed = new MessageEmbed()
      .setTitle("Thêm chúng tôi vào máy chủ của bạn!")
      .setDescription("Bạn thích sử dụng bot? Tuyệt vời cảm ơn bạn! Cân nhắc thêm nó vào máy chủ của bạn để chúng tôi có thể xác minh sớm")
      .setColor("#F0EAD6")
      .setAuthor('Harmony','https://cdn.discordapp.com/attachments/778600026280558617/781024479623118878/ezgif.com-gif-maker_1.gif')
      .setThumbnail(message.guild.iconURL())
      .addField(`Sử dụng liên kết sau để thêm vào máy chủ bất hòa của bạn`, 'https://discordapp.com/oauth2/authorize?&client_id=834090978721398824&scope=bot', true)

    inviteEmbed.setTimestamp();

    return message.channel.send(inviteEmbed).catch(console.error);
  }
};