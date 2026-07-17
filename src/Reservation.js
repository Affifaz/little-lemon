import { useState } from 'react';
import ReservationStep1 from './ReservationStep1';
import ReservationStep2 from './ReservationStep2';
import ReservationConfirmation from './ReservationConfirmation';

const initialFormData = {
  date: '',
  time: '7:00 PM',
  diners: 2,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

function Reservation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const isCompleted = step === 3;

  return (
    <>
      {isCompleted ? (
        <section className="ReserveBanner ReserveBanner--compact">
          <h1 className="ReserveBanner-completedTitle">Reserve - Completed</h1>
        </section>
      ) : (
        <section className="ReserveBanner" aria-labelledby="reserve-heading">
          <h1 id="reserve-heading" className="ReserveBanner-title">
            Reserve a Table
          </h1>
          <p className="ReserveBanner-subtitle">
            Book your spot at Little Lemon in just a few taps
          </p>
          <p className="ReserveBanner-step">Reserve - Step {step}</p>
        </section>
      )}

      {step === 1 && (
        <ReservationStep1
          date={formData.date}
          time={formData.time}
          diners={formData.diners}
          onChange={handleChange}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <ReservationStep2
          values={formData}
          onChange={handleChange}
          onSubmit={() => setStep(3)}
        />
      )}

      {step === 3 && <ReservationConfirmation formData={formData} />}
    </>
  );
}

export default Reservation;
