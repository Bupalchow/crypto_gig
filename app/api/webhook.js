export default async function handler(req, res) {
    const { message } = req.body;
  
    if (message && message.text) {
      const chatId = message.chat.id;
      const responseText = "Welcome to the mini-game! Type /start to begin.";
      await fetch(`https://api.telegram.org/bot{process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: responseText }),
      });
    }
  
    res.status(200).send("OK");
  }
  