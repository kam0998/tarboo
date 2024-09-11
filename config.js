import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

moment.tz.setDefault("Africa/Cairo"); // تحديد التوقيت الزمني الافتراضي

global.botnumber = "";
global.confirmCode = "";

global.owner = [
  ['249111230420', ':┋MOHAMMED ADEL┋:', true],
  ['249111230420', ':┋MOHAMMED ADEL²┋: ', true],
];

global.suittag = ['249111230420'];
global.prems = ['249111230420'];
global.packname = '• 𝙱𝙾𝚃 𝙴𝙻 MIDO | 🐼❤️) ء';
global.author = '‹ MIDO ʙᴏᴛ ،| 🌝♥️';
global.vs = 'V2 • 1.0.5';
global.wm = '• MIDO 🄱🄾🅃 | ،💛؛❥!';
global.titulowm = '•❬ mido 𝒃𝒐𝒕 ❭•︎';
global.titulowm2 = `• 𝙱𝙾𝚃 𝙴𝙻 mido | 🐼❤️)`;
global.igfg = 'mido 𝒃𝑂𝑇';
global.rwait = '⌛';
global.done = '✅';
global.wait = '⌛ *`الرجاء الانتظار قليلا...`*\n*✪✦✦⊹⊹⊹⊹⊹⊹⊹⊹✪*';

global.imagen1 = fs.readFileSync('./Menu2.jpg');
global.imagen2 = fs.readFileSync('./src/nuevobot.jpg');
global.imagen3 = fs.readFileSync('./src/Pre Bot Publi.png');
global.imagen4 = fs.readFileSync('./Menu.png');
global.imagen5 = fs.readFileSync('./src/+18.jpg');
global.imagen6 = fs.readFileSync('./Menu3.png');
global.imagen7 = fs.readFileSync('./src/menu_pt.png');
global.imagen8 = fs.readFileSync('./src/menu_fr.png');
global.imagen9 = fs.readFileSync('./src/menu_en.png');
global.imagen10 = fs.readFileSync('./src/menu_ru.png');
global.mods = [];

//* *******Tiempo***************
global.d = new Date(new Date().getTime() + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, { weekday: 'long' });
global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' });
global.mes = d.toLocaleDateString('es', { month: 'long' });
global.año = d.toLocaleDateString('es', { year: 'numeric' });
global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
//* ****************************
global.wm2 = `${dia} ${fecha}\mido 𝑩𝒐𝒕᪣︎`;
global.gt = 'mido 𝒃𝑂𝑇𐇵︎';
global.mysticbot = 'mido 𝐵𝑂𝑇᪣︎';
global.md = 'mido 𝙱𝙾𝚃💛📒 ؛';
global.mysticbot = 'mido 𝑩𝒐𝒕';
global.waitt = '⌛ *`الرجاء الانتظار قليلا...`*\n*✪✦✦⊹⊹⊹⊹⊹⊹⊹⊹✪*';
global.waittt = '⌛ *`الرجاء الانتظار قليلا...`*\n*✪✦✦⊹⊹⊹⊹⊹⊹⊹⊹✪*';
global.waitttt = '⌛ *`الرجاء الانتظار قليلا...`*\n*✪✦✦⊹⊹⊹⊹⊹⊹⊹⊹✪*';
global.nomorown = '20';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];
global.cmenut = '❖––––––『';
global.cmenub = '┊✦ ';
global.cmenuf = '╰━═┅═━––––––๑\n';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dmenut = '*❖─┅──┅〈*';
global.dmenub = '*┊»*';
global.dmenub2 = '*┊*';
global.dmenuf = '*╰┅────────┅✦*';
global.htjava = '⫹⫺';
global.htki = '*⭑•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•⭑*';
global.comienzo = '• • ◕◕════';
global.fin = '════◕◕ • •';
global.botdate = `*[ 📅 ] التاريخ:* ${moment.tz('Africa/Cairo').format('DD/MM/YY')}`;
global.bottime = `*[ ⏳ ] الوقت:* ${moment.tz('Africa/Cairo').format('HH:mm:ss')}`;
global.fgif = { key: { participant: '0@s.whatsapp.net' }, message: { 'videoMessage': { 'title': wm, 'h': `Hmm`, 'seconds': '999999999', 'gifPlayback': 'true', 'caption': bottime, 'jpegThumbnail': fs.readFileSync('./Menu.png') } } };
global.multiplier = 99;
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
];

//* ************************

const file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright('Update \'config.js\''));
  import(`${file}?update=${Date.now()}`);
});
