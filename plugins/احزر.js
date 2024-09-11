const fetch = require('node-fetch');

let timeout = 60000;  // مدة الوقت للتخمين (60 ثانية)
let poin = 500;  // عدد النقاط للجائزة
let handler = async (m, { conn }) => {
    conn.tebakCharacter = conn.tebakCharacter ? conn.tebakCharacter : {};
    let id = m.chat;

    if (id in conn.tebakCharacter) {
        conn.reply(m.chat, '❐┃لم يتم الإجابة على السؤال السابق بعد!┃❌', conn.tebakCharacter[id][0]);
        throw false;
    }

    let characterList = [
        { name: 'Naruto Uzumaki', img: 'https://i.imgur.com/9z0ZnHr.jpg' },
        { name: 'Monkey D. Luffy', img: 'https://i.imgur.com/O7TL2ji.jpg' },
        { name: 'Eren Yeager', img: 'https://i.imgur.com/U3hKMJ6.jpg' },
        { name: 'Goku', img: 'https://i.imgur.com/dCB1SyW.jpg' },
        { name: 'Light Yagami', img: 'https://i.imgur.com/MqD5TQ0.jpg' },
        { name: 'Izuku Midoriya', img: 'https://i.imgur.com/YRU9lMo.jpg' },
        { name: 'Tanjiro Kamado', img: 'https://i.imgur.com/DqLCi8A.jpg' },
        { name: 'Ichigo Kurosaki', img: 'https://i.imgur.com/JGx3RkT.jpg' },
        { name: 'Saitama', img: 'https://i.imgur.com/Cv7iNU7.jpg' },
        { name: 'Edward Elric', img: 'https://i.imgur.com/7ul7ZB1.jpg' },
        { name: 'Rem', img: 'https://i.imgur.com/4PUjXEk.jpg' },
        { name: 'Luffy', img: 'https://i.imgur.com/d6ihO4r.jpg' },
        { name: 'Sakura Haruno', img: 'https://i.imgur.com/ypmSwt8.jpg' },
        { name: 'Natsu Dragneel', img: 'https://i.imgur.com/6ev1yFV.jpg' },
        { name: 'Haruhi Suzumiya', img: 'https://i.imgur.com/t21pud8.jpg' },
        { name: 'Gintoki Sakata', img: 'https://i.imgur.com/nhE4Xrz.jpg' },
        { name: 'Mikasa Ackerman', img: 'https://i.imgur.com/xHhKOn0.jpg' },
        { name: 'Kakashi Hatake', img: 'https://i.imgur.com/YJtG5F6.jpg' },
        { name: 'Asuka Langley', img: 'https://i.imgur.com/J0oZhtG.jpg' },
        { name: 'Shoto Todoroki', img: 'https://i.imgur.com/mXvVICu.jpg' },
        { name: 'Inuyasha', img: 'https://i.imgur.com/CTy1C6J.jpg' }
    ];

    let character = characterList[Math.floor(Math.random() * characterList.length)];

    let caption = `*احزر شخصية الأنمي*
  ❐↞┇الـوقـت⏳↞ *${(timeout / 1000).toFixed(2)} ثانية* ┇
  *استخدم .انسحب للانسحاب*
  ❐↞┇الـجـائـزة💰↞ ${poin} نقاط ┇
『⛩️┃🏮MIDO🏮┃⛩️』
     `.trim();

    conn.tebakCharacter[id] = [
        await conn.sendFile(m.chat, character.img, '', caption, m),
        character, poin,
        setTimeout(() => {
            if (conn.tebakCharacter[id]) {
                conn.reply(m.chat, `❮ ⌛┇انتهى الوقت! ┇⌛❯\n❐↞┇الإجابة الصحيحة كانت: *${character.name}*┇`, conn.tebakCharacter[id][0]);
                delete conn.tebakCharacter[id];
            }
        }, timeout)
    ];
};

handler.help = ['احزر'];
handler.tags = ['game'];
handler.command = /^احزر$/i;

module.exports = handler;
