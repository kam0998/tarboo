let handler = async (m, { conn }) => {

    const vn = './media/الحب.mp3';
    conn.sendPresenceUpdate('recording', m.chat);
    conn.sendMessage(m.chat, {audio: {url: vn}, ptt: true, mimetype: 'audio/mpeg', fileName: `الحب.mp3`}, {quoted: m});
};

// دي كلمات المساعدة والأوسمة الخاصة بالأمر
handler.help = ['notification'];
handler.tags = ['notification'];

// دي الكلمات اللي الكود هيتفاعل معاها
handler.customPrefix = /^(الحب|مامعني الحب|ما هو الحب|يعني اي الحب)$/i;
handler.command = new RegExp;

export default handler;