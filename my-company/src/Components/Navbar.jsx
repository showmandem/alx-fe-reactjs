import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>My Website</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/services" style={styles.link}>Services</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
  },
  logo: {
    color: 'white',
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Navbar;
