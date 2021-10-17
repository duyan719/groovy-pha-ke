module.exports = { 
    name: "leave", 
    description: "Rời khỏi kênh hiện tại", 
    execute(message) {
         const { channel } = message.member.voice; 
         const serverQueue = message.client.queue.get(message.guild.id); 
         if (!channel) return message.reply("Trước tiên, bạn cần tham gia một kênh thoại! ").catch(console.error); 
         if (!message.guild.me.voice.channel) return message.reply("Tôi không ở trong một kênh thoại! ").catch(console.error); 
         if (channel.id !== message.guild.me.voice.channel.id) return message.reply("Tôi không ở trong kênh thoại của bạn!").catch(console.error); 
         if(serverQueue) { 
             serverQueue.connection.dispatcher.destroy(); 
             channel.leave(); 
             message.client.queue.delete(message.guild.id); 
             serverQueue.textChannel.send('Tôi đã rời khỏi kênh. Hẹn gặp lại.').catch(console.error); 
             return 
            }
            channel.leave(); 
            
    message.client.queue.delete(message.guild.id); 
    message.channel.send('Tôi đã rời khỏi kênh. Hẹn gặp lại.').catch(console.error); } };