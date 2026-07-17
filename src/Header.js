import { Menu, ShoppingBasket, Plus } from 'lucide-react';

function Header({ isMenuOpen, onMenuToggle }) {
  return (
    <header className="Header">
      <button
        type="button"
        className="Header-iconButton"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        onClick={onMenuToggle}
      >
        <Menu size={26} />
      </button>

      <img
        src={`${process.env.PUBLIC_URL}/little-lemon/logo-full.svg`}
        alt="Little Lemon"
        className="Header-logo"
      />

      <button type="button" className="Header-iconButton" aria-label="View basket">
        <span className="Header-basket">
          <ShoppingBasket size={24} />
          <Plus size={12} className="Header-basketBadge" />
        </span>
      </button>
    </header>
  );
}

export default Header;
