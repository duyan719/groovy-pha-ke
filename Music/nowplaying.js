////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const createBar = require("string-progressbar");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const {
  approveemoji,
  denyemoji,
  PREFIX,
} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "nowplaying",
  aliases: ['np',"now-playing","current","current-song"],
  description: "Hiển thị bài hát hiện tại",
  cooldown: 5,
  edesc: `Nhập nowplaying trong trò chuyện, để xem bài hát nào hiện đang phát! Cũng như sẽ mất bao lâu cho đến khi hoàn thành\nUsage: ${PREFIX}nowplaying`,
  
execute(message) {
    //if not in a guild return
    if(!message.guild) return;
    //react with approve emoji
    message.react(approveemoji)
    //get Server Queue
    const queue = message.client.queue.get(message.guild.id);
    //if nothing playing error
    if (!queue) return attentionembed(message, "Không có gì chơi.").catch(console.error);
    //Define the current song 
    const song = queue.songs[0];
    //get current song duration in s
    let minutes = song.duration.split(":")[0];   
    let seconds = song.duration.split(":")[1];    
    let ms = (Number(minutes)*60+Number(seconds));   
    //get thumbnail
    let thumb;
    if (song.thumbnail === undefined) thumb = "https://media.giphy.com/media/P4OLEIP94nLi63K9JM/giphy.gif";
    else thumb = song.thumbnail.url;
    //define current time
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    //define left duration
    const left = ms - seek;
    //define embed
    let nowPlaying = new MessageEmbed()
          .setAuthor('♪Đang chơi♪','https://cdn.discordapp.com/attachments/778600026280558617/781024479623118878/ezgif.com-gif-maker_1.gif','https://harmonymusic.tk')
          .setDescription(`[**${song.title}**](${song.url})`)
          .setThumbnail(song.thumbnail.url)
          .setColor("#F0EAD6")
          .setFooter(`Được yêu cầu bởi: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
      //if its a stream
      if(ms >= 10000) {
        nowPlaying.addField("\u200b", "🔴 LIVE", false);
        //send approve msg
        return message.channel.send(nowPlaying);
      }
      //If its not a stream 
      if (ms > 0 && ms<10000) {
        nowPlaying.addField("\u200b", "**``[" + createBar((ms == 0 ? seek : ms), seek, 25, "▬", "🔘")[0] + "]``**\n**" + "\n[" + new Date(seek * 1000).toISOString().substr(11, 8) + " / " + (ms == 0 ? " ◉ LIVE" : new Date(ms * 1000).toISOString().substr(11, 8))+ "]**" + "\n" + "\n **Thời gian còn lại:**" + "``" + new Date(left * 1000).toISOString().substr(11, 8) + "``", false );
        //send approve msg
        return message.channel.send(nowPlaying);
      }
  }
};
