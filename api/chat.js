const KNOWLEDGE = `
КОМПАНИЯ: Никифор — частный риэлтор в Москве. Личный подход, полное сопровождение сделок с недвижимостью.

УСЛУГИ И ЦЕНЫ:

1. Продажа квартиры (вторичка)
   - Комиссия: 2% от стоимости сделки (минимум 150 000 ₽)
   - Входит: оценка, фотосъёмка, размещение на 15+ площадках, показы, переговоры, юридическая проверка, сопровождение сделки до регистрации

2. Покупка квартиры (вторичка)
   - Комиссия: 150 000 ₽ фиксированно
   - Входит: подбор по критериям, проверка юридической чистоты, торг с продавцом, сопровождение сделки

3. Новостройки
   - Для покупателя: бесплатно (комиссию платит застройщик)
   - Входит: подбор ЖК, сравнение планировок, бронирование, помощь с ипотекой

4. Аренда (для арендатора)
   - Комиссия: 50% от месячной арендной платы
   - Входит: подбор вариантов, показы, проверка документов, составление договора

5. Аренда (для собственника)
   - Комиссия: 100% от месячной арендной платы
   - Входит: фотосъёмка, размещение объявлений, показы, проверка арендаторов, договор

6. Элитная / загородная недвижимость
   - Комиссия: от 250 000 ₽ или 2-3% от стоимости
   - Индивидуальные условия

7. Юридическое сопровождение сделки (без риэлторских услуг)
   - Стоимость: 50 000 ₽
   - Входит: проверка документов, составление договора, сопровождение в МФЦ/Росреестре

8. Консультация
   - Первичная: бесплатно (30 минут)
   - Расширенная (анализ ситуации + рекомендации): 5 000 ₽

КОНТАКТЫ:
- Телефон / WhatsApp: по запросу
- Telegram: по запросу
- Email: по запросу
- Записаться на бесплатную консультацию можно прямо здесь в чате

ТЕРРИТОРИЯ: Москва и Московская область

ОПЫТ: Более 8 лет на рынке недвижимости, 300+ успешных сделок.
`;

const SYSTEM_PROMPT = `Ты — "Личный помощник Никифора", AI-ассистент частного риэлтора Никифора.

ПРАВИЛА:
1. Отвечай ТОЛЬКО на основе информации ниже. Не выдумывай цены, услуги или факты.
2. Если информации нет — скажи: "К сожалению, у меня нет такой информации. Запишитесь на бесплатную консультацию — Никифор ответит лично."
3. Отвечай кратко, по делу, дружелюбно. Используй "вы".
4. Если клиент интересуется конкретной услугой — назови цену и что входит.
5. Предлагай записаться на бесплатную консультацию, когда уместно.
6. Не обсуждай конкурентов и не сравнивай цены с другими агентствами.

${KNOWLEDGE}`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_KEY;
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/65e981dd-177f-4bc7-8b18-0e18ac172aa8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/chat.js:66',message:'H4: env var check',data:{hasKey:!!apiKey,keyPrefix:apiKey?apiKey.substring(0,7):'MISSING'},timestamp:Date.now(),hypothesisId:'H4'})}).catch(()=>{});
  // #endregion
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message' });
  }

  try {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/65e981dd-177f-4bc7-8b18-0e18ac172aa8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/chat.js:80',message:'H3: calling OpenAI',data:{messageLength:message.length,systemLength:SYSTEM_PROMPT.length},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
    // #endregion

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.6
      })
    });

    const data = await response.json();

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/65e981dd-177f-4bc7-8b18-0e18ac172aa8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/chat.js:101',message:'H1+H2: OpenAI response',data:{status:response.status,hasChoices:!!data?.choices,errorType:data?.error?.type,errorMsg:data?.error?.message,firstChoiceExists:!!data?.choices?.[0]},timestamp:Date.now(),hypothesisId:'H1,H2'})}).catch(()=>{});
    // #endregion

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: 'Empty response', debug: data });
    }

    res.json({ response: text });
  } catch (err) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/65e981dd-177f-4bc7-8b18-0e18ac172aa8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api/chat.js:114',message:'H3: network error',data:{error:err.message},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
    // #endregion
    res.status(500).json({ error: err.message });
  }
}
