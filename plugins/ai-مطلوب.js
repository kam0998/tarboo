import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw '*اين الصوره؟*'
  if (mime && mime.startsWith('video/')) {
    throw 'رد علی صوره!';
  }
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)/.test(mime)
  m.reply(wait)
  let link = await (isTele ? uploadImage : uploadImage)(media);
  let lr = (`https://api.popcat.xyz/wanted?image=${link}`)
  conn.sendFile(m.chat, lr, 'wanted.png', `*『🔥┇𝙼𝚅𝚁𝙾 𝙱𝙾𝚃』*`, m)
}
handler.help = ['wanted']
handler.tags = ['meme']
handler.command = ['مطلوب','المطلوب']

handler.group = true
export default handler
