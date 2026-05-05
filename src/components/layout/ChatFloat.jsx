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
  /\*\*(SMALL|MEDIUM|LARGE)\s+(.+?)\*\*\n(💰[^\n]+)\n(💵[^\n]+)\n(→[^\n]+)/.source;

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
      specs: match[3],
      total: match[4],
      desc: match[5].replace(/^→\s*/, ''),
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
        <div className={styles.carSpecs}>{card.specs}</div>
        <div className={styles.carTotal}>{card.total}</div>
        <div className={styles.carDesc}>{card.desc}</div>
      </div>
    </div>
  );
}

function BotMessage({ content, images }) {
  const parsed = parseMessage(content, images);

  if (parsed.type === 'plain') {
    return (
      <div className={`${styles.bubble} ${styles.botBubble}`}>
        <PlainText text={parsed.text} />
      </div>
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChatFloat({ defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_CHAT_API_URL ?? '/api/chat';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response, images: data.images || [] },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Tuve un problema técnico. Por favor, intentá de nuevo o escribile a Patricia: https://wa.me/13057731787',
          images: [],
        },
      ]);
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
              onClick={sendMessage}
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
