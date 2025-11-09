import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links (optional) */}
        <nav>
          <a href="/">Home</a> |{' '}
          <a href="/about">About</a> |{' '}
          <a href="/services">Services</a> |{' '}
          <a href="/contact">Contact</a>
        </nav>

        <hr />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
