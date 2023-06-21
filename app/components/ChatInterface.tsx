import React, { useState } from 'react';
import axios from 'axios';

function ChatInterface() {
  const [dialogue, setDialogue] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDialogue([...dialogue, { sender: 'user', message: input }]);
    const response = await axios.post('/api/chat', { message: input });
    setDialogue([...dialogue, { sender: 'user', message: input }, { sender: 'gpt', message: response.data.message }]);
    setInput('');
  };

  return (
    <div>
      <ul>
        {dialogue.map((entry, index) => (
          <li key={index}>
            <strong>{entry.sender}</strong>: {entry.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatInterface;
