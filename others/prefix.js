const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

const db = require('quick.db');


module.exports = {
  name: `prefix`,
  description: `Set prefix cho máy chủ của bạn`,
  aliases: ["setprefix"],
  cooldown: 5,
  edesc: `Nhập lệnh này để đặt prefix cho máy chủ của bạn Usage: ${PREFIX}prefix <NEW PREFIX>`,
 async execute(message, args, client) {

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = PREFIX;

    //react with approve emoji
    message.react("✅");

    if(!args[0]) return message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`Prefix hiện tại: \`${prefix}\``)
    .setFooter('Vui lòng set prefix mới')
    );
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`🚫 Bạn không có quyền cho Lệnh này!`)
    );

    if(args[1]) return message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`'❗Prefix không được có hai khoảng trắng'`));

    db.set(`prefix_${message.guild.id}`, args[0])

    message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`✅ Đặt thành công prefix mới thành **\`${args[0]}\`**`))
  }
}