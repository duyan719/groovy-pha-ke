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
  name: "resume",
  aliases: ["r"],
  description: "Tiếp tục phát nhạc hiện đang phát",
  cooldown: 5,
  edesc: `Nhập lệnh này để tiếp tục Bài hát bị tạm dừng!\nUsage: ${PREFIX}resume`,
  
execute(message) {
    //if not a guild return
    if(!message.guild) return;
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //get the Server Queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message,"Không có gì chơi!").catch(console.error);
    //if user not in the same channel as the bot retunr
    if (!canModifyQueue(message.member)) return;
    //if its paused
    if (!queue.playing) {
      //set it to true
      queue.playing = true;
      //resume the Bot
      queue.connection.dispatcher.resume();
      //Create approve embed
      const playembed = new MessageEmbed().setColor("#F0EAD6")
      .setAuthor(`${message.author.username} tiếp tục âm nhạc!`, "https://media.giphy.com/media/kiho1zyvAmGiKBjIAs/giphy.gif")
      //send the approve
      return queue.textChannel.send(playembed).catch(console.error);
    }
    //if its not paused return error
    return  attentionembed(message, "Hàng đợi không bị tạm dừng!").catch(console.error);
  }
};
