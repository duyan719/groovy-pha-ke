const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
  approveemoji,
  denyemoji 
} = require(`../config.json`);

module.exports = {
  name: `help`,
  description: `Cung cấp cho bạn danh sách tất cả các Lệnh trợ giúp`,
  aliases: ["a","commands"],
  cooldown: 3,
  edesc: "Nhập help để xem trước tất cả các Lệnh, Nhập help <COMMANDNAME> để nhận thông tin mở rộng về một lệnh này!",
  execute(message,args,client) {
     
    let commands = message.client.commands.array();
 
    let helpEmbed = new MessageEmbed()
      .setTitle("Bot Help")
      .setAuthor('Bấm vào đây để mời tôi', 'https://cdn.discordapp.com/attachments/778600026280558617/781024479623118878/ezgif.com-gif-maker_1.gif', 'https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=49572160&scope=bot')
      .setDescription(`**PREFIX:** \`${PREFIX}\``)
      .setFooter( client.user.username +`Type: ${PREFIX}help <Command>  để biết thêm thông tin!`, "https://cdn.discordapp.com/attachments/778600026280558617/781024479623118878/ezgif.com-gif-maker_1.gif")
      .setColor("#F0EAD6");

      let ifargstruedothis = -1;
      
      switch(args[0]){
          case "filter":
           ifargstruedothis=0;
          break;
          case "loop":
            ifargstruedothis=1;
          break;
          case "lyrics":
            ifargstruedothis=2
          break;
          case "nowplaying":
            ifargstruedothis=3
          break;
          case "pause":
            ifargstruedothis=4
          break;
          case "play":
            ifargstruedothis=5
          break;
          case "playlist":
            ifargstruedothis=6
          break;
          case "queue":
            ifargstruedothis=7
          break;
          case "radio":
            ifargstruedothis=8
          break;
          case "remove":
            ifargstruedothis=9
          break;
          case "resume":
            ifargstruedothis=10
          break;
          case "search":
            ifargstruedothis=11
          break;
          case "shuffle":
            ifargstruedothis=12
          break;
          case "skip":
            ifargstruedothis=13
          break;
          case "skipto":
            ifargstruedothis=14
          break;
          case "stop":
            ifargstruedothis=15
          break;
          case "volume":
            ifargstruedothis=16
          break;
          case "help":
            ifargstruedothis=17
          break;    
          case "invite":
            ifargstruedothis=18
          break;
          case "ping":
            ifargstruedothis=19
          break;
          case "prefix":
            ifargstruedothis=20
          break;
          case "uptime":
            ifargstruedothis=21
          break;
          case "botlist":
            ifargstruedothis=22
          break;
          default:        
            commands.forEach((cmd) => {
              helpEmbed.addField(
                `**${message.client.prefix}${cmd.name}**`,
                `${cmd.description}`,
                true
              );
            });
          if(!message.guild) {
            if(!args[0]) {message.react(approveemoji);return message.channel.send(helpEmbed);}
            return
            }
            message.channel.send(helpEmbed);
           
        break;
       }
     
       if(ifargstruedothis>=0){
         let aliases = commands[ifargstruedothis].aliases;
         if(aliases === undefined || !aliases) aliases="No Aliases!";
         let cooldown = commands[ifargstruedothis].cooldown;
         if(cooldown === undefined || !cooldown) cooldown="No Cooldown!";


        helpEmbed.addField(
          `**${message.client.prefix}${commands[ifargstruedothis].name}**`,
          `\`\`\`fix\n${commands[ifargstruedothis].edesc}\n\`\`\`\n\`${commands[ifargstruedothis].description}\``
        );
        helpEmbed.addField(
          `**:notes: Aliases:**`,
          `\`${aliases}\``
        );
        helpEmbed.addField(
          `**:wrench: Cooldown:**`,
          `\`${cooldown}\``
        );
        if(!message.guild) return message.channel.send(helpEmbed);
          message.channel.send(helpEmbed);
       }

}
}