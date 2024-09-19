import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { command, usedPrefix, conn, args, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, {
      text: `*❲ ❗ ❳ يرجي إدخال نص للبحث عن الأغنية .*\nمثال :\n> ➤  ${usedPrefix + command} القرآن الكريم\n> ➤  ${usedPrefix + command} https://youtu.be/JLWRZ8eWyZo?si=EmeS9fJvS_OkDk7p`,
    }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
    return;
  }
  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

  try {
    const yt_play = await search(args.join(' '));

    const dataMessage = `*❲ نتيجة البحث عن : ${text} ❳*\n➤ العنوان : ${yt_play[0].title}\n➤ النشر : ${yt_play[0].ago}\n➤ الطول : ${secondString(yt_play[0].duration.seconds)}\n➤ الرابط : ${yt_play[0].url}\n➤ المشاهدات : ${MilesNumber(yt_play[0].views)}\n➤ الصانع : ${yt_play[0].author.name}\n➤ القناة : ${yt_play[0].author.url}\n> انتظر جاري تحميل الاغنيه ...`.trim();

    const iturl = yt_play[0].url;
    const itimg = yt_play[0].thumbnail;

    await conn.sendMessage(m.chat, { image: { url: itimg }, caption: dataMessage }, { quoted: m });

    try {
      const q = '128kbps';
      const yt = await youtubedl(iturl).catch(async () => await youtubedlv2(iturl));
      const dl_url = await yt.audio[q].download();
      const ttl = await yt.title;
      await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3` }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });
    } catch {
      await fallbackDownload(iturl, conn, m);
    }
  } catch {
    await conn.sendMessage(m.chat, {
      text: `*❲ ❗ ❳ حدث خطأ عند البحث عن الأغنية .*\nيرجي ادخال نص صحيح أو رابط مثال :\n> ➤  ${usedPrefix + command} القرآن الكريم\n> ➤  ${usedPrefix + command} https://youtu.be/JLWRZ8eWyZo?si=EmeS9fJvS_OkDk7p`,
    }, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.command = /^(اغنيه|اغنية)$/i;
export default handler;

async function fallbackDownload(iturl, conn, m) {
  try {
    const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${iturl}`);
    const lolh = await lolhuman.json();
    const n = lolh.result.title || 'error';
    await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });
    await conn.sendMessage(m.chat, { audio: { url: lolh.result.link }, mimetype: 'audio/mpeg', fileName: `${n}.mp3` }, { quoted: m });
  } catch {
    await handleFallback('mp3', iturl, m, conn);
  }
}

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'ar', gl: 'AR', ...options });
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' يوم, ' : ' أيام, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' ساعة, ' : ' ساعات, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' دقيقة, ' : ' دقائق, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' ثانية' : ' ثواني') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
                                }
