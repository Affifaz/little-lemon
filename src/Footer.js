import { Link } from 'react-router-dom';

const doormatLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Order Online', href: '/order' },
  { label: 'Login', href: '/login' },
];

function Footer() {
  return (
    <footer className="Footer">
      <img
        src={`${process.env.PUBLIC_URL}/little-lemon/logo.svg`}
        alt="Little Lemon logo"
        className="Footer-logo"
      />

      <nav className="Footer-nav" aria-label="Footer navigation">
        <ul>
          {doormatLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <address className="Footer-contact">
        <p>123 Lemon Street, Chicago, IL</p>
        <p>
          <a href="tel:+13125551234">(312) 555-1234</a>
        </p>
        <p>
          <a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a>
        </p>
      </address>

      <ul className="Footer-social">
        <li>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </li>
        <li>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </li>
        <li>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </li>
      </ul>

      <p className="Footer-copyright">
        &copy; {new Date().getFullYear()} Little Lemon. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
