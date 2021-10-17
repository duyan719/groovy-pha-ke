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
  name: "shuffle",
  aliases: ["mix"],
  description: "Xáo trộn hàng đợi hiện tại!",
  cooldown: 5,
  edesc: `Gõ Command, nếu một Hàng đợi tồn tại để thay đổi thành Thứ tự của Hàng đợi, một cách ngẫu nhiên.\nUsage: ${PREFIX}shuffle`,

execute(message,args,client) {
    //if not in a guild return
    if(!message.guild) return;
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //get the Queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message, "Không có hàng đợi.");
    //if not in the same channel as the bot
    if (!canModifyQueue(message.member)) return;
    //get all queue songs
    let songs = queue.songs;
    //make an array and mix them
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    //define queue.songs
    queue.songs = songs;
    //set the Queue
    message.client.queue.set(message.guild.id, queue);
    //send the Approve message
    queue.textChannel.send(new MessageEmbed()
    .setDescription(`**:notes: | ${message.author} xáo trộn hàng đợi**`)
    .setColor("#F0EAD6")).catch(console.error);
  }
};
