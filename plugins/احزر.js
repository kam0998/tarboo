import fetch from 'node-fetch';

let timeout = 60000;
let poin = 500;

let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {};
    let id = m.chat;
    
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tebakbendera[id][0]);
        throw false;
    }
    
    try {
        let src = await (await fetch('https://gist.githubusercontent.com/Kyutaka101/98d564d49cbf9b539fee19f744de7b26/raw/f2a3e68bbcdd2b06f9dbd5f30d70b9fda42fec14/guessflag')).json();
        let json = src[Math.floor(Math.random() * src.length)];
        let imageBuffer = await (await fetch(json.img)).buffer();
        let caption = `*${command.toUpperCase()}*\n
❐↞┇الـوقـت⏳↞ *${(timeout / 1000).toFixed(2)} ┇\n
*استخدم .انسحب للأنسحاب*\n
❐↞┇الـجـائـزة💰↞ ${poin} نقاط┇\n
『ᴍɪᴅᴏ ʙᴏᴛ』`.trim();
        
        conn.tebakbendera[id] = [
            await conn.sendFile(m.chat, imageBuffer, '', caption, m),
            json, poin,
            setTimeout(() => {
                if (conn.tebakbendera[id]) {
                    conn.reply(m.chat, `❮ ⌛┇انتهي الوقت┇⌛❯\n❐↞┇الاجـابـة✅↞ ${json.name}*┇`, conn.tebakbendera[id][0]);
                    delete conn.tebakbendera[id];
                }
            }, timeout)
        ];
    } catch (error) {
        console.error('Error fetching or sending data:', error);
        conn.reply(m.chat, '❌ حدث خطأ، يرجى المحاولة لاحقاً.', m);
    }
};

handler.help = ['guessflag'];
handler.tags = ['game'];
handler.command = /^احزر/i;

export default handler;
