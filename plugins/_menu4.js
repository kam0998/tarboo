import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import fetch from 'node-fetch';
import fs from 'fs';
import moment from 'moment-timezone';
import { promises } from 'fs';
import { join } from 'path';
const time = moment.tz('Africa/Egypt').format('HH');
let wib = moment.tz('Africa/Egypt').format('HH:mm:ss');
// import db from '../lib/database.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(new Date() + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات`;

    let user = global.db.data.users[who];
    let { money, joincount } = global.db.data.users[m.sender];
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who];
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);
    let rtotal = Object.entries(global.db.data.users).length || '0';
    let math = max - xp;
    let prem = global.prems.includes(who.split`@`[0]);
    let sn = createHash('md5').update(who).digest('hex');
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let taguser = conn.getName(m.sender); // تعديل هنا للحصول على الاسم بدلاً من الرقم
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}};

    // إرسال تفاعل React
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    // الانتظار لمدة ثانيتين
    await new Promise(resolve => setTimeout(resolve, 300));

    await conn.sendMessage(m.chat, { text: '*جاري تحضير قائمة الاوامر*' }, { quoted: global.fcontact });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const img = './Menu.png';
    const str = `
> *✧────[ مرحبا ]────╮*
> *┤ *مرحبا يا ${taguser}*
> *┤ 🤴🏻 المطور: MOHAMMED ADEL*
> *┤ #️⃣ الرقم: wa.me/249111230420*
> *┤ ✅ الاصدار: 1.2.0*
> *┤ 🎳 البادئة: •*
> *┤ 🧜🏽‍♂️ المستخدمين: ${rtotalreg}*  
> *┤────────────···*
> *✧────[معـلـومـات الـمسـتـخـدم]────╮*
> *┤ 🎩 *الاسـم: ${name}*
> *┤ 🔃 المستوي: ${level}*
> *┤────────────···* 
> *✧────[ الـوقـت والـتـاريـخ ]────╮*
> *┤ 📆 التاريخ: ${date}*
> *┤ 📅 اليوم: ${week}*
> *┤ 🚀 وقت النشاط: ${uptime}*
> *┤────────────···*

⟣┈┈┈⟢〘❄〙⟣┈┈┈⟢
         *༺ قــســم الـأداوات ༻*
⟣┈┈┈⟢〘❄〙⟣┈┈┈⟢
│✯ ❯ .كومنت. 
│✯ ❯ .جوده. 
│✯ ❯ .زخرف. 
│✯ ❯ .كود. 
│✯ ❯ .ترجمه. 
│✯ ❯ .فيك. 
│✯ ❯ .دحيح.   〘 ذكاء اصطناعي يقرا الصور ايضا 〙
│✯ ❯ . شوف.  〘 نفس الشئ 〙
│✯ ❯ .انطق. 
✪┋𝐁𝐘┋❥ MIDI☞𝐁𝐎𝐓 ┋✪

⟣┈┈┈⟢〘❄〙⟣┈┈┈┈⟢`;

    await conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: global.fcontact });
};

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(7)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

export default handler;
