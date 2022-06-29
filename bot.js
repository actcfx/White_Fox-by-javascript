const Discord = require('discord.js');      //#引用discord.py，賦予到常數(const)Discord上
const { token } = require('./token.json');      //#新宣告一個 Discord(discord.js)下的Client方法，然後將Client方法的結果賦予到client這個常數上，要引用discord.js底下的Client，可以直接呼叫client
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

// 連上線時的事件
client.on('ready', () => {
    console.log(`->Logged in as ${client.user.tag}!`);
});

// 當 Bot 接收到訊息時的事件
client.on('message', msg => {
    // 如果訊息的內容是 'ping'
    if (msg.content === 'ping') {
        // 則 Bot 回應 'Pong'
        msg.reply('pong');
    }
});

client.login(token);