let timeout = 60000; // وقت انتهاء اللعبة (60 ثانية)
let points = 500; // النقاط التي سيحصل عليها المستخدم إذا أجاب بشكل صحيح
let handler = async (m, { conn, command }) => {
    conn.tebakCar = conn.tebakCar ? conn.tebakCar : {};
    let id = m.chat;
    if (id in conn.tebakCar) {
        conn.reply(m.chat, '❐┃لم يتم الإجابة على السؤال السابق بعد┃❌ ❯', conn.tebakCar[id][0]);
        throw false;
    }

    // قائمة السيارات العشوائية
    let cars = [
        { name: 'Toyota', img: 'https://example.com/toyota.jpg' },
        { name: 'BMW', img: 'https://example.com/bmw.jpg' },
        { name: 'Mercedes', img: 'https://example.com/mercedes.jpg' },
        { name: 'Audi', img: 'https://example.com/audi.jpg' },
        { name: 'Honda', img: 'https://example.com/honda.jpg' },
        { name: 'Ford', img: 'https://example.com/ford.jpg' },
        { name: 'Chevrolet', img: 'https://example.com/chevrolet.jpg' },
        { name: 'Nissan', img: 'https://example.com/nissan.jpg' },
        { name: 'Lamborghini', img: 'https://example.com/lamborghini.jpg' },
        { name: 'Ferrari', img: 'https://example.com/ferrari.jpg' }
    ];

    // اختر سيارة عشوائية من القائمة
    let car = cars[Math.floor(Math.random() * cars.length)];
    let caption = `*${command.toUpperCase()}*
❐↞┇احزر نوع السيارة🚗↞ *${(timeout / 1000).toFixed(2)} ثواني* ┇
❐↞┇استخدم .انسحب للانسحاب┇
❐↞┇الـجـائـزة💰↞ ${points} نقاط┇
『⛩️┃🏮ميدو بوت🏮┃⛩️』
`;

    conn.tebakCar[id] = [
        await conn.sendFile(m.chat, car.img, '', caption, m),
        car, points,
        setTimeout(() => {
            if (conn.tebakCar[id]) conn.reply(m.chat, `❮ ⌛┇انتهى الوقت┇⌛❯\n❐↞┇الإجابة الصحيحة: ${car.name} ┇`, conn.tebakCar[id][0]);
            delete conn.tebakCar[id];
        }, timeout)
    ];
};

handler.help = ['احزر سيارة'];
handler.tags = ['game'];
handler.command = /^سياره$/i;

export default handler;
