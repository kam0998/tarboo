import ytdl from 'ytdl-core';
import yts from 'yt-search';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `مثال : \n ${usedPrefix}${command} midle of night`;

  let search = await yts(text);
  if (!search || search.videos.length === 0) throw 'Video Not Found, Try Another Title';

  let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
  let { title, thumbnail, timestamp, views, ago, url } = vid;
  let wm = ' 💝 ZOZO 💝'; 
  let author = 'ZOZO';

  let captvid = `*❖───┊ ♪ يــوتـــيــوب ♪ ┊───❖*
    *↜❍ الـعـنوان:* ${title}
      ⇆ㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤ↻
       00:15 ━━━━●────── 
  *↜❍  الـرابــط:* ${url}
  *ـــــــــــــــــــــــ☽ ZOZO ☾ـــــــــــــــــــــ*`;

  await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid, footer: author }, { quoted: m });

  const audioStream = ytdl(url, {
    filter: 'audioonly',
    quality: 'highestaudio',
  });

  const tmpDir = os.tmpdir();
  const filePath = `${tmpDir}/${title}.mp3`;

  const writableStream = fs.createWriteStream(filePath);

  await streamPipeline(audioStream, writableStream);

  let doc = {
    audio: {
      url: filePath
    },
    mimetype: 'audio/mp4',
    fileName: `${title}.mp3`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: title,
        body: wm,
        sourceUrl: url,
        thumbnail: await (await conn.getFile(thumbnail)).data
      }
    }
  };

  await conn.sendMessage(m.chat, doc, { quoted: m });

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete audio file: ${err}`);
    } else {
      console.log(`Deleted audio file: ${filePath}`);
    }
  });
};

handler.help = ['play'].map((v) => v + ' <query>');
handler.tags = ['downloader'];
handler.command = ['mp3', 'songs', 'ytmp3doc', 'اغنية2'];

handler.exp = 0;
handler.diamond = false;

export default handler;
