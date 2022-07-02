const Discord = require('discord.js');      //# 引用discord.py並賦予到常數Discord上
const { token } = require('./token.json');      //# 宣告一個Discord(discord.js)下的Client方法，然後將Client方法的結果賦予到client這個常數上，之後要引用discord.js底下的Client，可以直接呼叫client。
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

// 連上線時的事件
client.on('ready', () => {
    console.log(`->Logged in as ${client.user.tag}!`)
});

client.on('guildMemberAdd', member =>{
    console.log(`-> ${member} join`)
})

// 當有人傳送訊息時的事件
client.on('messageCreate', msg => {
    // 前置判斷
    try {
        if (!msg.guild || !msg.member) return;  //# 如果訊息中存在guild（群組）元素 -> 私聊 -> return
        if (msg.member.user.bot) return; //# 如果訊息由bot發送 -> return
    } catch (err) {
        return;
    }
    // 字串分析
    try {
        const prefix = '/';     //# 定義前綴詞
        if (msg.content.substring(0, prefix.length) === prefix)     //# 判斷是否有前綴詞
        {
            const cmd = msg.content.substring(prefix.length).split(' ');     //# 以' '分割前綴以後的字串 => cmd
            if (msg.channel.id === '992026961494941726')
            {
                switch (cmd[0]) {
                    case 'ping':
                        msg.channel.send('ping');
                        console.log(`-> Send 'ping' to '${msg.channel.name}'`)
                        break;
                    case '老婆':
                        msg.reply("你沒有老婆！");
                        console.log(`-> Reply '你沒有老婆！' to ${msg.author.tag}`)
                        break;
                    case 'MyAvatar':
                        const avatar = GetMyAvatar(msg);
                        if (avatar.files) msg.reply(avatar);
                        console.log(`-> Reply 'avatar' to ${msg.author.tag}`)
                        break;
                    case 'luck':
                        luck = Luck();
                        if(luck.files) msg.reply(luck);
                        console.log(`-> Get luck successful`)
                }
            }
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

function Luck(){
    _luck = Math.floor(Math.random()*6)
    return{
        files: [{
            attachment: `./luckimage/luck_${_luck}.jpg`
        }]
    }
}

client.login(token);