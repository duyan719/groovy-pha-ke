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
  name: "stop",
  description: "Dừng nhạc",
  aliases: ["leave", "end"],
  cooldown: 5,
  edesc: `Gõ Command, để dừng phát và rời khỏi kênh.\nUsage: ${PREFIX}stop`,

async execute(message,args,client) {
  //if not in a guild retunr
  if (!message.guild) return;
  //react with approve emoji
  message.react(approveemoji).catch(console.error);
  const { channel } = message.member.voice;
  //get the serverQueue
  const queue = message.client.queue.get(message.guild.id);
  //if not a valid channel
  if (!channel) return attentionembed(message, "Vui lòng tham gia Kênh thoại trước");  
  //If not in the same channel return error
  if (queue && channel !== message.guild.me.voice.channel)
  return attentionembed(message, `Bạn phải ở cùng Kênh Thoại với tôi`);
  //if no Queue return error
  if (!queue)
    return attentionembed(message, "Không có gì bạn có thể dừng lại!");
  //if not in the same channel return
  if (!canModifyQueue(message.member)) return;
  //Leave the channel
  await channel.leave();
  //send the approve message    
  message.channel.send(new MessageEmbed()
  .setColor("#F0EAD6")
  .setAuthor(`${message.author.username} dừng nhạc!`, "https://cdn.discordapp.com/attachments/778600026280558617/781024479623118878/ezgif.com-gif-maker_1.gif"))
  .catch(console.error);
  }
};
