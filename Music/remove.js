////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { approveemoji,  denyemoji,  PREFIX,} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "remove",
  description: "Xóa bài hát khỏi hàng đợi",
  aliases: ["delete"],
  cooldown: 1.5,
  edesc: `Gõ lệnh này để xóa một bài hát cụ thể khỏi hàng đợi.\nUsage: ${PREFIX}remove <Queue num.>`,

execute(message, args) {
  //if its not a guild return
    if(!message.guild) return;
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if there is no queue return error
    if (!queue) return attentionembed(message,"Không có hàng đợi ");
    //if he isnt in the same voice channel as the bot
    if (!canModifyQueue(message.member)) return;
    //if no args then return error
    if (!args.length) return attentionembed(message,`Try: ${message.client.prefix}remove <Queue Number>`);
    //If not a number then return error
    if (isNaN(args[0])) return attentionembed(message,`Try: ${message.client.prefix}remove <Queue Number>`);
    //get the song
    const song = queue.songs.splice(args[0] - 1, 1);
    //react with approve
    message.react(approveemoji)
    //send approve
    queue.textChannel.send(new MessageEmbed()
    .setDescription(`:no_entry_sign: | ${message.author} loại bỏ **${song[0].title}** từ Hàng đợi`)
    .setColor("#F0EAD6")
    );
  }
};
