import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/layout/ChatFloat.module.css';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stripMd(text) {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1').trim();
}

function normalizeName(name) {
  return name
    .replace(/\s+\d{4}$/, '')
    .replace(/\s*\(\s*/g, '(')
    .replace(/\s*\)\s*/g, ')')
    .toLowerCase()
    .trim();
}

const CAR_BLOCK_SOURCE =
  /\*\*(SMALL|MEDIUM|LARGE)\s+(.+?)\*\*\n(?:📅\s*([^\n]+)\n)?(💰[\s\S]+?)(💵[^\n]+)\n{1,2}(→[^\n]+)/.source;

function parseMessage(text, images = []) {
  const re = new RegExp(CAR_BLOCK_SOURCE, 'g');
  const blocks = [];
  let match;

  while ((match = re.exec(text)) !== null) {
    const normBlock = normalizeName(match[2]);
    const image = images.find((img) => normalizeName(img.name) === normBlock) || null;
    blocks.push({
      start: match.index,
      end: match.index + match[0].length,
      type: match[1],
      fullName: match[2],
      date: match[3] ? match[3].trim() : null,
      specs: match[4].replace(/\s*\n\s*/g, ' ').trim(),
      total: match[5],
      desc: match[6].replace(/^→\s*/, ''),
      image,
    });
  }

  if (blocks.length === 0) {
    return { type: 'plain', text: stripMd(text) };
  }

  return {
    type: 'cards',
    intro: blocks[0].start > 0 ? stripMd(text.slice(0, blocks[0].start)) : null,
    outro: blocks[blocks.length - 1].end < text.length
      ? stripMd(text.slice(blocks[blocks.length - 1].end))
      : null,
    cards: blocks,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlainText({ text }) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/(https?:\/\/\S+)/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          /^https?:\/\//.test(part) ? (
            <a key={j} href={part} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {part}
            </a>
          ) : (
            part
          )
        )}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

const BADGE = {
  SMALL:  { bg: '#A8E6CF', color: '#1B4F72' },
  MEDIUM: { bg: '#2A9D9E', color: '#fff' },
  LARGE:  { bg: '#1B4F72', color: '#fff' },
};

function CarCard({ card }) {
  const badge = BADGE[card.type] ?? BADGE.MEDIUM;
  return (
    <div className={styles.carCard}>
      {card.image && (
        <img src={card.image.url} alt={card.fullName} className={styles.carImage} />
      )}
      <div className={styles.carBody}>
        <div className={styles.carHeader}>
          <span className={styles.carName}>{card.fullName}</span>
          <span className={styles.carBadge} style={{ background: badge.bg, color: badge.color }}>
            {card.type}
          </span>
        </div>
        {card.date && <div className={styles.carDate}>📅 {card.date}</div>}
        <div className={styles.carSpecs}>{card.specs}</div>
        <div className={styles.carTotal}>{card.total}</div>
        <div className={styles.carDesc}>{card.desc}</div>
      </div>
    </div>
  );
}

function SimpleCarCard({ img }) {
  return (
    <div className={styles.carCard}>
      {img.url && (
        <img src={img.url} alt={img.name} className={styles.carImage} />
      )}
      <div className={styles.carBody}>
        <div className={styles.carHeader}>
          <span className={styles.carName}>{img.name}</span>
        </div>
        {img.pricePerDay != null && (
          <div className={styles.carTotal}>💵 ${img.pricePerDay} / día</div>
        )}
      </div>
    </div>
  );
}

function BotMessage({ content, images }) {
  const parsed = parseMessage(content, images);

  if (parsed.type === 'plain') {
    return (
      <>
        <div className={`${styles.bubble} ${styles.botBubble}`}>
          <PlainText text={parsed.text} />
        </div>
        {images && images.length > 0 && images.map((img, i) => (
          <SimpleCarCard key={i} img={img} />
        ))}
      </>
    );
  }

  return (
    <>
      {parsed.intro && (
        <div className={`${styles.bubble} ${styles.botBubble}`}>
          <PlainText text={parsed.intro} />
        </div>
      )}
      {parsed.cards.map((card, i) => (
        <CarCard key={i} card={card} />
      ))}
      {parsed.outro && (
        <div className={`${styles.bubble} ${styles.botBubble}`}>
          <PlainText text={parsed.outro} />
        </div>
      )}
    </>
  );
}

// ─── Endpoint del bot ─────────────────────────────────────────────────────────
//
// El bot vive en Railway (repo floridaAventuraBot) y es EL MISMO que atiende
// Instagram. Lo correcto es que la URL venga de VITE_CHAT_API_URL en Vercel,
// pero si algún build sale sin esa variable el fallback tiene que seguir
// apuntando al bot bueno: antes caía a '/api/chat', que era una copia vieja del
// bot (Sonnet 4.5, prompt de abril) viviendo como función serverless. Esa copia
// ya no existe en el repo, así que sin este fallback el chat quedaría muerto.
const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL ??
  'https://floridaaventura-bot-production.up.railway.app/chat';

// El server corta solo a los 90s (server.js:379). Abortamos antes para no dejar
// los tres puntitos girando para siempre si la conexión se murió y el navegador
// no se entera. 60s es holgado: una cotización tarda 20-30s.
const CHAT_TIMEOUT_MS = 60000;

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChatFloat({ defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickReplies, setQuickReplies] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;

    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setQuickReplies([]);
    setIsLoading(true);

    // Una consulta con cotización tarda 20-30s. En ese rato un celular puede
    // cambiar de antena o de wifi y el navegador mata la request (en los logs de
    // Railway sale como 499: "client has closed the request"). El server la
    // termina igual, pero la respuesta se pierde. Por eso reintentamos UNA vez, y
    // solo cuando la falla fue de red: un error HTTP del server no se reintenta
    // (sería gastar tokens dos veces por algo que va a fallar igual).
    const pedirRespuesta = async () => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), CHAT_TIMEOUT_MS);
      try {
        const res = await fetch(CHAT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updated.map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: ctrl.signal,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const err = new Error(errData.error || `HTTP ${res.status}`);
          err.esDelServidor = true; // no reintentar
          throw err;
        }

        return await res.json();
      } finally {
        clearTimeout(timer);
      }
    };

    try {
      let data;
      try {
        data = await pedirRespuesta();
      } catch (err) {
        // AbortError = se nos acabaron los 60s. Reintentar sería hacer esperar
        // 2 minutos al cliente, así que ese tampoco se reintenta.
        if (err.esDelServidor || err.name === 'AbortError') throw err;
        console.warn('[chat] falla de red, reintento una vez:', err);
        data = await pedirRespuesta();
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response, images: data.images || [] },
      ]);
      setQuickReplies(data.quickReplies || []);
    } catch (err) {
      // Antes este catch era ciego (`catch {}`): un 500, una red cortada y un
      // JSON roto daban todos el mismo cartel y no quedaba rastro en ningún lado.
      console.error('[chat] no pude responder:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Se me cortó la conexión y no pude traerte la respuesta. Probá de nuevo, o escribile directo a Patricia: https://wa.me/13057731787',
          images: [],
        },
      ]);
      setQuickReplies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.popup}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.palmCircle}>🌴</div>
            <div className={styles.headerText}>
              <div className={styles.botTitle}>Florida Aventura</div>
              <div className={styles.botSubtitle}>Rent a Car · Miami</div>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.statusRow}>
                <span className={styles.statusDot} />
                <span className={styles.statusLabel}>En línea</span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.headerStripe} />

          {/* Messages */}
          <div className={styles.messages}>
            {messages.length === 0 && !isLoading && (
              <div className={styles.welcome}>
                <div className={styles.welcomePalm}>🌴</div>
                <p>
                  Hola, soy <strong>Leo</strong>, el asistente de Florida Aventura.
                  ¿Ya tenés tu viaje a Miami confirmado?
                </p>
              </div>
            )}

            {messages.map((msg, i) =>
              msg.role === 'user' ? (
                <div key={i} className={styles.userRow}>
                  <div className={`${styles.bubble} ${styles.userBubble}`}>
                    <PlainText text={msg.content} />
                  </div>
                </div>
              ) : (
                <div key={i} className={styles.botRow}>
                  <BotMessage content={msg.content} images={msg.images} />
                </div>
              )
            )}

            {isLoading && (
              <div className={styles.botRow}>
                <div className={`${styles.bubble} ${styles.botBubble} ${styles.typing}`}>
                  <span /><span /><span />
                </div>
              </div>
            )}

            {!isLoading && quickReplies.length > 0 && (
              <div className={styles.quickReplies}>
                {quickReplies.map((qr, i) => (
                  <button
                    key={i}
                    className={styles.quickReplyBtn}
                    onClick={() => sendMessage(qr)}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputArea}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribí tu consulta..."
              className={styles.input}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              className={styles.sendBtn}
              disabled={isLoading || !input.trim()}
              aria-label="Enviar mensaje"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        className={`${styles.chatFloat} ${isOpen ? styles.chatFloatOpen : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Cerrar chat' : 'Hablar con Leo'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chatIcon}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chatIcon}>
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>
    </>
  );
}
