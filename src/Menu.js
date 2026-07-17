import { useState } from 'react';
import menuItems from './data/menuItems';
import MenuItem from './MenuItem';

const categories = ['Lunch', 'Mains', 'Desserts', 'A La Carte', 'Specials'];

function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);

  const visibleItems = activeCategory
    ? menuItems.filter((item) => item.category === activeCategory)
    : menuItems;

  function handleCategoryClick(category) {
    setActiveCategory((current) => (current === category ? null : category));
  }

  return (
    <section className="Menu" aria-labelledby="menu-heading">
      <h2 id="menu-heading" className="Menu-heading">
        Order for delivery!
      </h2>

      <ul className="Menu-categories">
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={`Pill ${activeCategory === category ? 'is-active' : ''}`}
              aria-pressed={activeCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <ul className="Menu-list">
        {visibleItems.map((item) => (
          <MenuItem
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </ul>
    </section>
  );
}

export default Menu;
