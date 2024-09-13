const handler = async (m, { conn }) => {
  let messageText = m.text.toLowerCase();
  if (messageText.includes('ميدو') || messageText.includes('mido')) {
    const emojis = [
      '😂', '😎', '👍', '🔥', '❤️', '😄', '🎉', '😉', '💯', '🤔',
      '😜', '🤩', '🥳', '🤗', '😇', '🙃', '😏', '🤤', '😱', '🥺',
      '😈', '👻', '👽', '🤖', '💀', '👾', '🐱‍👤', '🐱‍🚀', '🦸‍♂️', '🦹‍♀️',
      '🎃', '🎯', '🏆', '⚽', '🏀', '🚀', '🎮', '🕹️', '🎵', '🎧'
    ];
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    await conn.sendMessage(m.chat, {
      react: {
        text: randomEmoji,
        key: m.key,
      }
    });
  }
};

handler.command = /^(.*)$/i;
export default handler;
