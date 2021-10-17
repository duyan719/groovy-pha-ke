////////////////////////////
////////CONFIG LOAD/////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "skipto",
  aliases: ["st", "jump"],
  description: "Chuyển đến số hàng đợi đã chọn",
  cooldown: 5,
  edesc: `Gõ Command để chuyển một lượng bài hát cụ thể sang bài hát bạn muốn.\nUsage: ${PREFIX}skipto`,

execute(message, args) {
    //if not in a guild return
    if (!message.guild) return;
    //react with approve
    message.react(approveemoji).catch(console.error);
    //if no args return error
    if (!args.length)
      return attentionembed(message, `Try: ${message.client.prefix}${module.exports.name} <Queue Number>`)
    //if not a number return error
    if (isNaN(args[0]))
      return attentionembed(message, `Try: ${message.client.prefix}${module.exports.name} <Queue Number>`)
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no Queue return error
    if (!queue) return attentionembed(message, "Không có hàng đợi");
    //if member not in the same voice channel as the Bot return
    if (!canModifyQueue(message.member)) return;
    //if args bigger then the Server Queue return error
    if (args[0] > queue.songs.length)
      return attentionembed(message, `Hàng đợi chỉ Dài! ${queue.songs.length} `);
    //set playing to true
    queue.playing = true;
    //if the queue is loop 
    if (queue.loop) {
      //make a loop for all songs to skip and add them at the end again
      for (let i = 0; i < args[0] - 1; i++) 
        queue.songs.push(queue.songs.shift());
    //if not a loop
    } else {
      //remove all songs including the args 
      queue.songs = queue.songs.slice(args[0] - 1);
    }
    //end current song
    queue.connection.dispatcher.end();
    //Send approve
    queue.textChannel.send(
      new MessageEmbed()
        .setColor("#F0EAD6")
        .setAuthor(`${message.author.username}#${message.author.discriminator} skipped ${args[0]} songs`, "https://cdn.discordapp.com/attachments/778600026280558617/781024479623118878/ezgif.com-gif-maker_1.gif")
    ).catch(console.error);
  }
};
