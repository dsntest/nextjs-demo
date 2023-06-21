import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to ChatGPT Demo</h1>
      <Link to="/chat">Start Chatting</Link>
    </div>
  );
}

export default Home;
