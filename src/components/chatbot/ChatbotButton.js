const ChatbotButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        zIndex: 1000,
        padding: '12px 16px',
        borderRadius: '50%',
        backgroundColor: '#6c5ce7',
        color: '#fff',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
      }}
    >
      💬
    </button>
  );
};

export default ChatbotButton;
