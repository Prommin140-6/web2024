import React, { useState } from 'react';
import './style.css';
import Header from './Header';
import Quiz from './Quiz';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Quiz />
      </main>
    </div>
  );
}

export default App;
