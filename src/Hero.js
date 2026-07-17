import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="Hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="Hero-title">
        Little Lemon
      </h1>
      <h2 className="Hero-subtitle">Chicago</h2>

      <div className="Hero-body">
        <p className="Hero-description">
          We are a family owned Mediterranean restaurant, focused on
          traditional recipes served with a modern twist.
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/little-lemon/hero1.png`}
          alt="A selection of dishes served at Little Lemon"
          className="Hero-image"
        />
      </div>

      <Link className="Button" to="/reservations">
        Reserve a table
      </Link>
    </section>
  );
}

export default Hero;
