const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

module.exports = {
  name: `uptime`,
  description: `Cung cấp cho bạn thời gian hoạt động của Bot`,
  aliases: [],
  cooldown: 5,
  edesc: "Với điều đó, bạn có thể thấy Bot đã chạy không ngừng trong bao lâu",
  execute(message, args, client) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    //react with approve emoji
    message.react("✅");
    return message.channel.send(new MessageEmbed().setColor("#F0EAD6").setTitle(`***Thời gian hoạt động của Bot:***\n\n\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\n\``));


  }
}