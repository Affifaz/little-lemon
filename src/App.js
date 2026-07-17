import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Reservation from './Reservation';
import Footer from './Footer';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((open) => !open)} />
      <Nav isOpen={isMenuOpen} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations" element={<Reservation />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
