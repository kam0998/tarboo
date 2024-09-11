const fetch = require('node-fetch');

let timeout = 60000;
let poin = 500;

let handler = async (m, { conn }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {};
    let id = m.chat;

    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '❐┃لم يتم الإجابة على السؤال السابق بعد!┃❌', conn.tebakbendera[id][0]);
        throw false;
    }

    let flags = [
        { country: 'USA', img: 'https://www.countryflags.io/us/flat/64.png' },
        { country: 'Canada', img: 'https://www.countryflags.io/ca/flat/64.png' },
        { country: 'Japan', img: 'https://www.countryflags.io/jp/flat/64.png' },
        { country: 'Germany', img: 'https://www.countryflags.io/de/flat/64.png' },
        { country: 'France', img: 'https://www.countryflags.io/fr/flat/64.png' },
        { country: 'Brazil', img: 'https://www.countryflags.io/br/flat/64.png' },
        { country: 'China', img: 'https://www.countryflags.io/cn/flat/64.png' },
        { country: 'India', img: 'https://www.countryflags.io/in/flat/64.png' },
        { country: 'Russia', img: 'https://www.countryflags.io/ru/flat/64.png' },
        { country: 'Australia', img: 'https://www.countryflags.io/au/flat/64.png' },
        { country: 'Italy', img: 'https://www.countryflags.io/it/flat/64.png' },
        { country: 'Spain', img: 'https://www.countryflags.io/es/flat/64.png' },
        { country: 'South Korea', img: 'https://www.countryflags.io/kr/flat/64.png' },
        { country: 'Mexico', img: 'https://www.countryflags.io/mx/flat/64.png' },
        { country: 'Argentina', img: 'https://www.countryflags.io/ar/flat/64.png' },
        { country: 'Turkey', img: 'https://www.countryflags.io/tr/flat/64.png' },
        { country: 'Netherlands', img: 'https://www.countryflags.io/nl/flat/64.png' },
        { country: 'Saudi Arabia', img: 'https://www.countryflags.io/sa/flat/64.png' },
        { country: 'Sweden', img: 'https://www.countryflags.io/se/flat/64.png' },
        { country: 'Norway', img: 'https://www.countryflags.io/no/flat/64.png' },
        { country: 'New Zealand', img: 'https://www.countryflags.io/nz/flat/64.png' },
        { country: 'South Africa', img: 'https://www.countryflags.io/za/flat/64.png' },
        { country: 'Nigeria', img: 'https://www.countryflags.io/ng/flat/64.png' },
        { country: 'Egypt', img: 'https://www.countryflags.io/eg/flat/64.png' },
        { country: 'Pakistan', img: 'https://www.countryflags.io/pk/flat/64.png' },
        { country: 'Bangladesh', img: 'https://www.countryflags.io/bd/flat/64.png' },
        { country: 'Malaysia', img: 'https://www.countryflags.io/my/flat/64.png' },
        { country: 'Philippines', img: 'https://www.countryflags.io/ph/flat/64.png' },
        { country: 'Vietnam', img: 'https://www.countryflags.io/vn/flat/64.png' },
        { country: 'Thailand', img: 'https://www.countryflags.io/th/flat/64.png' },
        { country: 'Colombia', img: 'https://www.countryflags.io/co/flat/64.png' },
        { country: 'Chile', img: 'https://www.countryflags.io/cl/flat/64.png' }
    ];

    let flag = flags[Math.floor(Math.random() * flags.length)];

    let caption = `*احزر علم الدولة*
  ❐↞┇الـوقـت⏳↞ *${(timeout / 1000).toFixed(2)} ثانية* ┇
  *استخدم .انسحب للانسحاب*
  ❐↞┇الـجـائـزة💰↞ ${poin} نقاط ┇
『⛩️┃🏮MIDO🏮┃⛩️』
     `.trim();

    conn.tebakbendera[id] = [
        await conn.sendFile(m.chat, flag.img, '', caption, m),
        flag, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) {
                conn.reply(m.chat, `❮ ⌛┇انتهى الوقت! ┇⌛❯\n❐↞┇الإجابة الصحيحة كانت: *${flag.country}*┇`, conn.tebakbendera[id][0]);
                delete conn.tebakbendera[id];
            }
        }, timeout)
    ];
};

handler.help = ['علم'];
handler.tags = ['game'];
handler.command = /^علم$/i;

module.exports = handler;
