let handler = async (m, { conn, isROwner, text }) => {
    const delay = time => new Promise(res => setTimeout(res, time));

    // الحصول على جميع الشاتات (الـ Private Chats والمجموعات)
    let chats = Object.entries(conn.chats).filter(([jid, chat]) => 
        (jid.endsWith('@g.us') || jid.endsWith('@s.whatsapp.net')) && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce
    ).map(([jid, chat]) => ({ id: jid, name: chat.name || jid }));

    // الحصول على النص المرسل من الرسالة الأصلية أو النص المحدد
    let pesan = m.quoted && m.quoted.text ? m.quoted.text : text;
    if (!pesan) throw '*⚠️ أدخل النص الذي تريده*';

    let startTime = Date.now(); // بدء توقيت الإرسال
    let successfulGroups = [];
    let successfulPrivates = [];
    let failedGroups = 0; // عدد المجموعات التي فشل إرسال الرسالة إليها
    let failedPrivates = 0; // عدد الشاتات الخاصة التي فشل إرسال الرسالة إليها
    
    // إرسال الرسالة إلى جميع الشاتات
    for (let { id, name } of chats) {
        await delay(500); // تأخير لمدة 500 مللي ثانية
        try {
            await conn.relayMessage(id, {
                liveLocationMessage: {
                    degreesLatitude: 35.685506276233525,
                    degreesLongitude: 139.75270667105852,
                    accuracyInMeters: 0,
                    degreesClockwiseFromMagneticNorth: 2,
                    caption: '––––––『 *إذاعة* 』––––––\n\n' + pesan + '\n\n*💌  هذا بيان رسمي من مالك البوت ميدو*',
                    sequenceNumber: 2,
                    timeOffset: 3,
                    contextInfo: m,
                }
            }, {});

            // تحديد ما إذا كان الشات مجموعة أو خاص
            if (id.endsWith('@g.us')) {
                successfulGroups.push(name); // إضافة اسم المجموعة إلى قائمة الناجحة
            } else {
                successfulPrivates.push(name); // إضافة اسم الشات الخاص إلى قائمة الناجحة
            }
        } catch (error) {
            console.error(`خطأ في إرسال الرسالة إلى ${name}:`, error);
            // زيادة العدد في حالة الفشل
            if (id.endsWith('@g.us')) {
                failedGroups++; // زيادة عدد المجموعات الفاشلة
            } else {
                failedPrivates++; // زيادة عدد الشاتات الخاصة الفاشلة
            }
        }
    }

    let endTime = Date.now(); // نهاية توقيت الإرسال
    let time2 = ((endTime - startTime) / 1000).toFixed(2); // حساب الوقت بالثواني

    // إعداد عدد المجموعات والشاتات الخاصة
    let groupsCount = successfulGroups.length;
    let privatesCount = successfulPrivates.length;
    let totalCount = groupsCount + privatesCount; // المجموع الكلي

    // إعداد الرسالة النهائية
    let message = `*📑 الرسالة اتبعتت لـ ${totalCount} شاتات*\n\n`;
    message += `*عدد المجموعات التي تم إرسال الرسالة إليها: ${groupsCount}*\n`;
    message += `*عدد الشاتات الخاصة التي تم إرسال الرسالة إليها: ${privatesCount}*\n`;
    message += `*عدد المجموعات التي فشل في إرسال الرسالة إليها: ${failedGroups}*\n`;
    message += `*عدد الشاتات الخاصة التي فشل في إرسال الرسالة إليها: ${failedPrivates}*\n`;
    message += `*الوقت الكلي للإرسال: ${time2} ثواني*`;

    // رد على المستخدم بعد إرسال الرسائل
    await m.reply(message);
};

handler.help = ['broadcastall', 'bcall'].map(v => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^broadcast(all|group|gc|private)|نشر|بث|اذاعه|ذيع|انشردا|انشرها$/i;
handler.owner = true;

export default handler;
