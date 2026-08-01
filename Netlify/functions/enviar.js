exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const bodyData = JSON.parse(event.body || "{}");
    const mensaje = bodyData.mensaje;

    // Acepta tanto TELEGRAM_TOKEN como TELEGRAM_BOT_TOKEN para evitar fallos
    const TOKEN = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN; 
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "Faltan las variables de entorno de Telegram en Netlify" }) 
      };
    }

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const respuesta = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `🚨 Nueva falla reportada en Dare-tech:\n\n${mensaje}`
      })
    });

    const resultadoTelegram = await respuesta.json();

    if (respuesta.ok) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } else {
      return { statusCode: 500, body: JSON.stringify({ error: resultadoTelegram.description || "Error al comunicar con Telegram" }) };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};