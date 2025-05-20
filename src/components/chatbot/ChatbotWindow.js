import { useState } from 'react';

const ChatbotWindow = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await fetch(`http://127.0.0.1:8000/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });
    const data = await res.json();
    setChat([...chat, { from: 'user', text: input }, { from: 'bot', text: data.answer }]);
    setInput('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '150px',
        right: '20px',
        width: '300px',
        height: '400px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>AI 챗봇</strong>
        <button onClick={onClose}>✖</button>
      </div>
      <div style={{ overflowY: 'auto', height: '80%', marginTop: '10px' }}>
        {chat.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
            <p><b>{msg.from === 'user' ? '나' : '봇'}:</b> {msg.text}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatbotWindow;
