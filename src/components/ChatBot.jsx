import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to PROMPT Trade Fairs. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Mock bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue.toLowerCase()),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input) => {
    if (input.includes('stall') || input.includes('price')) return "Stall prices vary based on location and size. Would you like to view our exhibitor guide or speak with an organizer?";
    if (input.includes('event') || input.includes('upcoming')) return "We have several exciting expos coming up! You can check them out in our 'Upcoming Exhibitions' section.";
    if (input.includes('contact') || input.includes('organizer')) return "You can reach our organizers at +91 91591 50000 or email us at info@prompttradefairs.com.";
    return "Thank you for your message. An organizer will get back to you shortly, or you can check our FAQ section.";
  };

  return (
    <div className="chatbot-wrapper" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 10001 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              right: '0',
              width: '350px',
              height: '500px',
              background: '#fff',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #f0f0f0'
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px', background: '#ED1C24', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700' }}>Organizer Chat</h3>
                <span style={{ fontSize: '12px', opacity: 0.8 }}>Online | Typically replies in minutes</span>
              </div>
              <FiX onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', fontSize: '1.2rem' }} />
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map(msg => (
                <div key={msg.id} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                  background: msg.sender === 'user' ? '#ED1C24' : '#f0f2f5',
                  color: msg.sender === 'user' ? '#fff' : '#111',
                  fontSize: '14px',
                  boxShadow: msg.sender === 'user' ? '0 4px 10px rgba(237, 28, 36, 0.2)' : 'none'
                }}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '20px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '50px',
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: '#ED1C24',
                  color: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              position: 'absolute', 
              top: '-55px', 
              width: '140px', 
              height: '70px', 
              pointerEvents: 'none',
              zIndex: -1
            }}
          >
            <svg width="140" height="70" viewBox="0 0 140 70">
              <path id="textCurve" d="M 20,60 Q 70,10 120,60" fill="none" />
              <text fill="#2699fb" style={{ fontSize: '13px', fontWeight: '900', fontFamily: "'Outfit', sans-serif", letterSpacing: '0.5px' }}>
                <textPath xlinkHref="#textCurve" startOffset="50%" textAnchor="middle">
                  We Are Here!
                </textPath>
              </text>
            </svg>
            <motion.div 
              animate={{ rotate: [0, 20, 0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ position: 'absolute', bottom: '10px', left: '5px', fontSize: '28px' }}
            >
            </motion.div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#ED1C24',
            color: '#fff',
            border: 'none',
            boxShadow: '0 10px 20px rgba(237, 28, 36, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.5rem',
            position: 'relative',
            zIndex: 2
          }}
        >
          {isOpen ? <FiX /> : <FiMessageCircle />}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatBot;
