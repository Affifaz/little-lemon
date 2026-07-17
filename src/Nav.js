import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Order Online', href: '/order' },
  { label: 'Login', href: '/login' },
];

function Nav({ isOpen }) {
  return (
    <nav className={`Nav ${isOpen ? 'is-open' : ''}`}>
      <ul className="Nav-list">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link to={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
