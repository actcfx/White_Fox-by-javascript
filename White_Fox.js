const Discord = require('discord.js');      //#引用discord.py，賦予到常數(const)Discord上
const { token } = require('./token.json');      //#新宣告一個 Discord(discord.js)下的Client方法，然後將Client方法的結果賦予到client這個常數上，要引用discord.js底下的Client，可以直接呼叫client
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

// 連上線時的事件
client.on('ready', () => {
    console.log(`->Logged in as ${client.user.tag}!`);
});

// 當 Bot 接收到訊息時的事件
client.on('messageCreate', msg => {
    if(msg.member.user.bot) return; //#如果來自於機器人

    if (msg.content === 'ping' && msg.channel.id === '991002552919281736') {   //#如果訊息的內容是 'ping'，且來自 'general' 頻道
        console.log(`->Reply "pong"!`)
        msg.channel.send('ping');       //#不會回覆發送者
//*        msg.reply('pong');       //#會回覆發送者
    }
});

client.login(token);