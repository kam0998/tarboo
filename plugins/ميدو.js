const handler = async (m, { conn }) => {
  let messageText = m.text.toLowerCase().replace(/\./g, '');

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
    
    let audioPath = './voice-man.mp3'; 
    
    await conn.sendMessage(m.chat, { audio: { url: audioPath }, mimetype: 'audio/mp4' }, { quoted: m });
  }
};

handler.command = /^(.*)$/i;
export default handler;
