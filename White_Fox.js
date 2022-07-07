const Discord = require('discord.js');      //# 引用discord.py並賦予到常數Discord上
const { token } = require('./token.json');      //# 宣告一個Discord(discord.js)下的Client方法，然後將Client方法的結果賦予到client這個常數上，之後要引用discord.js底下的Client，可以直接呼叫client。
const client = new Discord.Client ({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

// 連上線時的事件
client.on('ready', () => {
    console.log(`->Logged in as ${client.user.tag}!`)
});

client.on('guildMemberAdd', member => {
    switch(member.guild.id) {
        case '991002551979737109':
            var channelId = '991020606587822181';
        case '875245594355068958':
            var channelId = '994376068293202101';
    }
    const welcomeMessage = `Hey <@${member.id}>! Welcome to my server!`;
    member.guild.channels.fetch(channelId).then ( channel => {
        channel.send(welcomeMessage)
    });
});

// 當有人傳送訊息時的事件
client.on('messageCreate', msg => {
    // 前置判斷
    try {
        if (!msg.guild || !msg.member) return;  //# 如果訊息中存在guild（群組）元素 -> 私聊 -> return
        if (msg.member.user.bot) return; //# 如果訊息由bot發送 -> return
    } catch (err) {
        return;
    }

    // 防呆
    try {
        const prefix = '/';     //# 定義前綴詞
        // /指令
        if (msg.content.substring(0, prefix.length) === prefix) {     //# 判斷是否有前綴詞
            const cmd = msg.content.substring(prefix.length).split(' ');     //# 以' '分割前綴以後的字串 => cmd
            if (msg.channel.id === '992721929008066591' || msg.channel.id === '992026961494941726') {
                switch (cmd[0]) {
                    case 'ping':
                        setTimeout(() => {
                            msg.delete();
                        }, 1000);
                        if (cmd[1] === undefined) {
                            msg.channel.send('ping');
                        } else {
                            msg.channel.send(cmd[1]);
                        }
                        console.log(`-> Send 'ping' to '${msg.channel.name}'`)
                        break;
                    case '老婆':
                        if(msg.author.id === '407881227270356994') msg.reply("嗨！");
                        else msg.reply("你沒有老婆！");
                        console.log(`-> Reply '你沒有老婆！' to ${msg.author.tag}`)
                        break;
                    case 'MyAvatar':
                        const avatar = GetMyAvatar(msg);
                        if (avatar.files) msg.reply(avatar);
                        console.log(`-> Reply ${msg.author.tag}'s avatar to ${msg.author.tag}`)
                        break;
                    case 'BotAvatar':
                        const botavatar = GetBotAvatar();
                        if(botavatar.files) msg.reply(botavatar);
                        console.log(`-> reply ${client.user.tag}'s avatar to ${msg.author.tag}`)
                        break;
                    case 'luck':
                        luck = Luck();
                        if(luck.files) msg.reply(luck);
                        console.log(`-> Get luck successful`)
                        break;
                }
            }
            else {}
        }

        // 非/指令
        else if (msg.content === 'mdfk') {
            msg.channel.send(`mdfk`);
            console.log(`-> Send 'mdfk' to '${msg.channel.name}'`)
        }
        else if(msg.content === '好笑嗎') {
            msg.channel.send('好笑嗎');
            console.log(`-> Send '好笑嗎' to '${msg.channel.name}'`)
        }
    
    } catch (err) {
        console.log('OnMessageError', err)
    }
});

function GetMyAvatar(msg)
{
    try {
        return {
            files: [{
                attachment: msg.author.displayAvatarURL(),
                name: 'avatar.jpg'
            }]
        }
    } catch (err) {
        console.log('GetMyAvatarError')
    }
}

function GetBotAvatar(){
    try{
        return{
            files:[{
                attachment: client.user.displayAvatarURL(),
                name: 'Botavatar.jpg'
            }]
        }
    } catch (err) {
        console.log('GetBotAvatarError')
    }
}

function Luck(){
    try{
        _luck = Math.floor(Math.random()*7)
        return{
            files: [{
                attachment: `./luck_image/luck_${_luck}.jpg`
            }]
        }
    } catch (err) {
        console.log('LuckError')
    }
}

client.login(token);