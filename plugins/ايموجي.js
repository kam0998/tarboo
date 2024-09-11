const emojis = [
    '😊', '😂', '🥳', '🤩', '😎', '🙃', '😜', '🤪', '😍', '🤗', '😇', '😈',
    '🤡', '👻', '🎃', '💀', '👽', '🤖', '👾', '😺', '🙀', '🐶', '🐱', '🐸', '🐼',
    '💥', '✨', '🎉', '🔥', '🌟', '🌈', '🌹', '💫', '🎈', '🍀', '🍕', '🌮'
];

const responses = [
    '💬 ماذا هناك؟', '👋 مرحبا! كيف يمكنني مساعدتك؟', '🤔 هل تحتاج إلى مساعدة؟', '🎉 يا لها من مفاجأة!', '🧐 أحتاج إلى مزيد من المعلومات!'
];

export async function before(m, { conn }) {
    if (m.isBaileys) return;

    let randomEmojis = '';
    for (let i = 0; i < 5; i++) {
        randomEmojis += emojis[Math.floor(Math.random() * emojis.length)] + ' ';
    }

    let randomResponse = responses[Math.floor(Math.random() * responses.length)];

    await conn.reply(m.chat, `${randomResponse} ${randomEmojis}`, m);
}

export const exp = 0;
