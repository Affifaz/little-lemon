import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

function formatDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

function ReservationConfirmation({ formData }) {
  const guestName = `${formData.firstName} ${formData.lastName}`.trim();

  return (
    <section className="Confirmation" aria-labelledby="confirmation-heading">
      <span className="Confirmation-check">
        <Check size={40} color="#ffffff" strokeWidth={3} />
      </span>

      <h2 id="confirmation-heading" className="Confirmation-heading">
        Booking Confirmed !
      </h2>

      <div className="Confirmation-card">
        <img
          src={`${process.env.PUBLIC_URL}/little-lemon/logo.svg`}
          alt=""
          className="Confirmation-cardIcon"
        />
        <p className="Confirmation-cardBrand">Little Lemon</p>
      </div>

      <div className="Confirmation-details">
        <p className="Confirmation-detail Confirmation-detail--strong">
          Table for {formData.diners}
        </p>
        <p className="Confirmation-detail">
          {formatDate(formData.date)} {formData.time}
        </p>
        <p className="Confirmation-detail">Under: {guestName}</p>
      </div>

      <Link className="Button Button--full" to="/">
        Back to Home
      </Link>
    </section>
  );
}

export default ReservationConfirmation;
