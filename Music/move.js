require('array.prototype.move');
const { canModifyQueue } = require("../util/nkm");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Di chuyển các bài hát trong hàng đợi.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Không có hàng đợi.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}move <Queue Number>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}move <Queue Number>`);

    let songMoved = queue.songs[args[0] - 1];

    queue.songs.move(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} 🚚 di chuyển **${songMoved.title}**.`);
  }
};