function MenuItem({ name, description, price, image }) {
  return (
    <li className="MenuItem">
      <div className="MenuItem-text">
        <h3 className="MenuItem-name">{name}</h3>
        <p className="MenuItem-description">{description}</p>
        <p className="MenuItem-price">${price}</p>
      </div>
      <img src={image} alt={name} className="MenuItem-image" />
    </li>
  );
}

export default MenuItem;
