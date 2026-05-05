import ChatFloat from '../layout/ChatFloat';

export default function ChatTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', color: '#555' }}>
        <h1 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Leo — Chatbot Test</h1>
        <p style={{ fontSize: '0.9rem' }}>Entorno de pruebas. Hacé clic en el botón flotante (abajo a la derecha).</p>
      </div>
      <ChatFloat defaultOpen />
    </div>
  );
}
