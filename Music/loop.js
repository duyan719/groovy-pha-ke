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
  name: "loop",
  aliases: ['l'],
  description: "Chuyển đổi vòng lặp âm nhạc",
  cooldown: 3,
  edesc: `Chỉ cần gõ Command trong cuộc trò chuyện để kích hoạt / hủy kích hoạt vòng lặp, bạn cũng có thể phản ứng với biểu tượng cảm xúc của vòng lặp, để nhận cùng một mục tiêu!\nUsage: ${PREFIX}loop`,
execute(message) {
    //if not in a Guild return
    if(!message.guild) return;
    //Get the current Queue
    const queue = message.client.queue.get(message.guild.id);
    //If no Queue Error
    if (!queue) return attentionembed(message, "Không có gì chơi").catch(console.error);
    //If not in a VOICE 
    if (!canModifyQueue(message.member)) return;
    //Reverse the Loop state
    queue.loop = !queue.loop;
    //Define the Loop embed
    const loopembed = new MessageEmbed()
    .setColor(queue.loop ? "#F0EAD6" : "#F0EAD6")
    .setAuthor(`Vòng lặp bây giờ là: ${queue.loop ? " được kích hoạt" : " Vô hiệu hóa"}`, "https://cdn.discordapp.com/attachments/778600026280558617/781024479623118878/ezgif.com-gif-maker_1.gif")
    //react with approve emoji
    message.react(approveemoji);
    //send message into the Queue chat
    return queue.textChannel
      .send(loopembed)
      .catch(console.error);
  }
};
