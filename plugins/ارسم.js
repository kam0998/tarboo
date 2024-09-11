import fetch from 'node-fetch';

const endpointBase = 'https://cute-tan-gorilla-yoke.cyclic.app/imagine';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*هذا الأمر يقوم بإنشاء صور بناءً على النصوص المقدمة.*\n\n*مثال*\n*◉ ${usedPrefix + command} anime Sukuna*\n*◉ ${usedPrefix + command} anime cat*`;
  }

  try {
    m.reply('*الرجاء الانتظار، جاري إنشاء الصورة...*');

    const endpoint = `${endpointBase}?text=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'image.png', 'تم إنشاء هذه الصورة بواسطة بوت ميدو:', m);
    } else {
      throw '*فشل في إنشاء الصورة، حاول مرة أخرى لاحقًا.*';
    }
  } catch (error) {
    console.error(error);
    throw '*أُووبس! حدث خطأ أثناء إنشاء الصورة. يرجى المحاولة لاحقًا.*';
  }
};

handler.help = ['dalle'];
handler.tags = ['AI'];
handler.command = ['dalle', 'ارسم', 'رسم', 'openai2'];

export default handler;
