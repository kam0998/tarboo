import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import moment from 'moment-timezone';
import { join } from 'path';

const time = moment.tz('Africa/Egypt').format('HH');
let wib = moment.tz('Africa/Egypt').format('HH:mm:ss');

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(Date.now() + 3600000);
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

 await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    // الانتظار لمدة ثانيتين
    await new Promise(resolve => setTimeout(resolve, 300));

    await conn.sendMessage(m.chat, { text: '*جاري تحضير قائمة الاوامر*' }, { quoted: global.fcontact });

    setTimeout(async () => {
        // الرسالة الترحيبية
        const str = `
> *✧────[ مرحبا ]────╮*
> *┤ مرحبا يا ${taguser}*
> *┤ 🤴🏻 المطور: MOHAMMED ADEL*
> *┤ #️⃣ الرقم: wa.me/249111230420*
> *┤ ✅ الاصدار: 1.2.0*
> *┤ 🎳 البادئة: •*
> *┤ 🧜🏽‍♂️ المستخدمين: ${rtotalreg}*  
> *┤────────────···*
> *✧────[معـلـومـات الـمسـتـخـدم]────╮*
> *┤ 🎩 الاسم: ${name}*
> *┤ 🔃 المستوي: ${level}*
> *┤────────────···* 
> *✧────[ الـوقـت والـتـاريـخ ]────╮*
> *┤ 📆 التاريخ: ${date}*
> *┤ 📅 اليوم: ${week}*
> *┤ 🚀 وقت النشاط: ${uptime}*
> *┤────────────···*
> ➻𒍜➻『➳ᴹᴿ᭄MIDO BOT』`;

        await conn.relayMessage(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            title: '',
                            image: {
                                url: 'https://telegra.ph/file/66977b2c35e28a75c8cb0.jpg' // تأكد من وجود الصورة في المسار المحدد
                            }
                        },
                        body: {
                            text: str
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: 'single_select',
                                    buttonParamsJson: JSON.stringify({
                                        title: 'اضغط',
                                        sections: [
                                            {
                                                title: 'قسم الايديت',
                                                highlight_label: 'new',
                                                rows: [
                                                    {
                                                        header: 'info',
                                                        title: '⌬ ❛╏المطور',
                                                        description: '',
                                                        id: '.المطور'
                                                    },
                                                    {
                                                        header: '『』الايديت《',
                                                        title: '⌬ ❛╏ايديت',
                                                        description: '',
                                                        id: '.ايديت',
                                                    },
                                                    {
                                                        header: '『』تطقيمات《',
                                                        title: '⌬ ❛╏تطقيم',
                                                        description: '',
                                                        id: '.تطقيم',
                                                    },
                                                    {
                                                        header: '『』تطقيمات《',
                                                        title: '⌬ ❛╏اولاد',
                                                        description: '',
                                                        id: '.طقم2',
                                                    },
                                                    {
                                                        header: '『』عمك《',
                                                        title: '⌬ ❛╏ميسي',
                                                        description: '',
                                                        id: '.ميسي',
                                                    },
                                                    {
                                                        header: '『』عمك2《',
                                                        title: '⌬ ❛╏كريس',
                                                        description: '',
                                                        id: '.رونالدو',
                                                    },
                                                    {
                                                        header: '『』قول مياو《',
                                                        title: '⌬ ❛╏مياو',
                                                        description: '',
                                                        id: '.قط',
                                                    },
                                                    {
                                                        header: '『』كلب《',
                                                        title: '⌬ ❛╏كلب',
                                                        description: '',
                                                        id: '.كلب',
                                                    },
                                                ]
                                            }
                                        ]
                                    }),
                                    messageParamsJson: ''
                                }
                            ]
                        }
                    }
                }
            }
        }, { quoted: global.fcontact });
    }, 2000); // تأخير 3 ثواني
};

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = /^(2)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

export default handler;
