// client/src/App.js
import React from 'react';
import CountdownTimer from './components/CountdownTimer';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <CountdownTimer />
      <Footer />
    </div>
  );
}

export default App;
