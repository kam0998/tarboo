const handler = async (m, { conn }) => {
    let animeVoices = [
        { name: 'ناروتو', file: './voices/naruto.mp3' }, 
        { name: 'لوفي', file: './voices/luffy.mp3' },
        { name: 'ايتاشي', file: './voices/itachi.mp3' },
        { name: 'ساسكي', file: './voices/sasuke.mp3' },
        { name: 'زورو', file: './voices/zoro.mp3' },
        { name: 'غوكو', file: './voices/goku.mp3' },
        { name: 'فيجيتا', file: './voices/vegeta.mp3' },
        { name: 'كاكاشي', file: './voices/kakashi.mp3' },
        { name: 'ليفي', file: './voices/levi.mp3' },
        { name: 'إدوارد إلريك', file: './voices/edward.mp3' },
        { name: 'تانجيرو', file: './voices/tanjiro.mp3' },
        { name: 'ديكو', file: './voices/deku.mp3' },
        { name: 'إرين', file: './voices/eren.mp3' },
        { name: 'كيلوا', file: './voices/killua.mp3' },
        { name: 'غون', file: './voices/gon.mp3' }
    ];

    let modifiedText = m.text.replace(/احزر/gi, 'احزر ⚡');
    await conn.sendMessage(m.chat, { text: modifiedText }, { quoted: m });

    let randomVoice = animeVoices[Math.floor(Math.random() * animeVoices.length)];

    let messageText = `
❓ *السؤال: من صاحب هذا الصوت؟*
⏳ *الوقت: 60 ثانية*
💰 *الجائزة: 600 نقطة*
📝 *حقوق: ميدو*
    `;
    
    await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });
    await conn.sendMessage(m.chat, { audio: { url: randomVoice.file }, mimetype: 'audio/mp4' }, { quoted: m });

    setTimeout(async () => {
        await conn.sendMessage(m.chat, {
            text: `⏰ انتهى الوقت! صاحب الصوت هو: ${randomVoice.name}.\n📝 *حقوق: ميدو*`,
        }, { quoted: m });
    }, 60000);
};

handler.command = /^احزر$/i;

export default handler;
