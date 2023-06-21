"use client"

import { useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 发送用户输入的文本到ChatGPT API
    const response = await axios.post('/api/chat', { text: inputText });

    // 将用户输入和ChatGPT的回答添加到消息列表中
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, isUser: true },
      { text: response.data.text, isUser: false },
    ]);

    // 清空输入框
    setInputText('');
  };

  return (
    <div>
      <h1>ChatGPT Demo</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
            {message.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
