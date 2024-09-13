import fs from 'fs';
import axios from 'axios';

let timeout = 60000;
let poin = 500;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakanime = conn.tebakanime ? conn.tebakanime : {};

    let id = m.chat;
    if (id in conn.tebakanime) {
        conn.reply(m.chat, `
╮───────────────────────╭ـ
│ *يوجد سؤال لم تجب عليه بعد!* ┃❌ ❯
╯───────────────────────╰ـ`.trim(), conn.tebakanime[id][0]);
        throw false;
    }

    try {
        let animeCharacters = [
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Naruto Uzumaki", "image": "https://example.com/naruto.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Sasuke Uchiha", "image": "https://example.com/sasuke.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Goku", "image": "https://example.com/goku.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Vegeta", "image": "https://example.com/vegeta.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Monkey D. Luffy", "image": "https://example.com/luffy.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Zoro", "image": "https://example.com/zoro.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Ichigo Kurosaki", "image": "https://example.com/ichigo.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Levi Ackerman", "image": "https://example.com/levi.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Eren Yeager", "image": "https://example.com/eren.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Light Yagami", "image": "https://example.com/light.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Edward Elric", "image": "https://example.com/edward.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Alphonse Elric", "image": "https://example.com/alphonse.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Natsu Dragneel", "image": "https://example.com/natsu.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Gray Fullbuster", "image": "https://example.com/gray.jpg" },
            { "question": "من هو هذا الشخصية من الأنمي؟", "response": "Erza Scarlet", "image": "https://example.com/erza.jpg" }
        ];

        let json = animeCharacters[Math.floor(Math.random() * animeCharacters.length)];
        let clue = json.response.replace(/[A-Za-z]/g, '_');
        let img = json.image;
        let answer = json.response;
        let questions = json.question || 'من هو هذا الشخصية؟';
             
        let caption = `
╮───────────────────────╭ـ
│ ❓ *السـؤال : ${questions}*
│ ⏳ *الـوقـت : ${(timeout / 1000).toFixed(2)} ثانية*
│ 💰 *الـجـائـزة : ${poin} نقطه*
│ 🏳️ *الانسـحاب : استخدم [انسحاب] للانسحاب من اللعبة*
╯───────────────────────╰ـ`.trim();

        conn.tebakanime[id] = [
            await conn.sendMessage(m.chat, { image: { url: img }, caption: caption }, { quoted: m }),
            json, poin,
            setTimeout(async () => {
                if (conn.tebakanime[id]) await conn.reply(m.chat, `
╮───────────────────────╭ـ
│ ❎ *انتهى الوقت ولم تجب*
│ ✅ *الاجابة الصحيحة هي : ${answer}*
╯───────────────────────╰ـ`.trim(), conn.tebakanime[id][0]);

                delete conn.tebakanime[id];
            }, timeout)
        ];

        await conn.sendMessage(m.chat, { react: { text: "👍", key: m.key } });

    } catch (error) {
        console.error('Error:', error);
    }
};

handler.help = ['guessanime'];
handler.tags = ['game'];
handler.command = /^(احزر)$/i;

export default handler;
