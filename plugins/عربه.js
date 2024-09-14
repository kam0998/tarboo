import fetch from 'node-fetch';

let timeout = 60000;
let poin = 500;

let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakmobil = conn.tebakmobil ? conn.tebakmobil : {};
    let id = m.chat;

    if (id in conn.tebakmobil) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tebakmobil[id][0]);
        throw false;
    }

    try {
        let carData = [
            { name: "Ferrari 488", img: "https://upload.wikimedia.org/wikipedia/commons/3/37/Ferrari_488_Pista_2018.jpg" },
            { name: "Lamborghini Huracan", img: "https://upload.wikimedia.org/wikipedia/commons/6/6c/2015_Lamborghini_Huracan_%28LA_Auto_Show%29_01.jpg" },
            { name: "Porsche 911", img: "https://upload.wikimedia.org/wikipedia/commons/0/0e/2016_Porsche_911_Carrera_4S_3.0_Front.jpg" },
            { name: "McLaren 720S", img: "https://upload.wikimedia.org/wikipedia/commons/d/d8/2018_McLaren_720S_4.0_Front.jpg" },
            { name: "Bugatti Chiron", img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/2017_Bugatti_Chiron_8.0_Front.jpg" },
            { name: "Aston Martin DB11", img: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Aston_Martin_DB11.jpg" },
            { name: "Chevrolet Corvette C8", img: "https://upload.wikimedia.org/wikipedia/commons/d/df/2020_Chevrolet_Corvette_C8.jpg" },
            { name: "BMW M4", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/2021_BMW_M4_Competition.jpg" },
            { name: "Audi R8", img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_R8_V10_Performance_4S.jpg" },
            { name: "Nissan GT-R", img: "https://upload.wikimedia.org/wikipedia/commons/7/71/2017_Nissan_GT-R.jpg" },
            { name: "Jaguar F-Type", img: "https://upload.wikimedia.org/wikipedia/commons/8/84/2018_Jaguar_F-Type_3.0_V6_S.jpg" },
            { name: "Ford Mustang Shelby GT500", img: "https://upload.wikimedia.org/wikipedia/commons/2/20/2020_Ford_Mustang_Shelby_GT500.jpg" },
            { name: "Mercedes-AMG GT", img: "https://upload.wikimedia.org/wikipedia/commons/8/83/2015_Mercedes-AMG_GT_Front.jpg" },
            { name: "Lotus Evora", img: "https://upload.wikimedia.org/wikipedia/commons/0/06/Lotus_Evora.jpg" },
            { name: "Pagani Huayra", img: "https://upload.wikimedia.org/wikipedia/commons/8/85/Pagani_Huayra_2012.jpg" }
        ];

        let json = carData[Math.floor(Math.random() * carData.length)];
        let imageBuffer = await (await fetch(json.img)).buffer();

        let caption = `*${command.toUpperCase()}*\n
❐↞┇الـوقـت⏳↞ *${(timeout / 1000).toFixed(2)} ┇\n
*استخدم .انسحب للأنسحاب*\n
❐↞┇الـجـائـزة💰↞ ${poin} نقاط┇\n
『ᴍɪᴅᴏ ʙᴏᴛ』`.trim();

        conn.tebakmobil[id] = [
            await conn.sendFile(m.chat, imageBuffer, '', caption, m),
            json, poin,
            setTimeout(() => {
                if (conn.tebakmobil[id]) {
                    conn.reply(m.chat, `❮ ⌛┇انتهي الوقت┇⌛❯\n❐↞┇الاجـابـة✅↞ ${json.name}*┇`, conn.tebakmobil[id][0]);
                    delete conn.tebakmobil[id];
                }
            }, timeout)
        ];
    } catch (error) {
        console.error('Error fetching or sending data:', error);
        conn.reply(m.chat, '❌ حدث خطأ، يرجى المحاولة لاحقاً.', m);
    }
};

handler.help = ['عربه', 'عربة'];
handler.tags = ['game'];
handler.command = /^عربه|عربة/i;

export default handler;
