const menuItems = [
  {
    id: 'greek-salad',
    name: 'Greek Salad',
    description:
      'The famous Greek salad of crispy lettuce, peppers, olives and our Chicago-style feta cheese, garnished with crunchy garlic croutons.',
    price: '12.99',
    category: 'Mains',
    image: `${process.env.PUBLIC_URL}/little-lemon/image1.png`,
  },
  {
    id: 'bruschetta',
    name: 'Bruschetta',
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    price: '7.99',
    category: 'A La Carte',
    image: `${process.env.PUBLIC_URL}/little-lemon/image3.png`,
  },
  {
    id: 'grilled-fish',
    name: 'Grilled Fish',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    price: '20.00',
    category: 'Specials',
    image: `${process.env.PUBLIC_URL}/little-lemon/image2.png`,
  },
];

export default menuItems;
