import { useReducer, useState } from 'react';
import BookingForm from './BookingForm';
import ReservationStep2 from './ReservationStep2';
import ReservationConfirmation from './ReservationConfirmation';
import { parseLocalDate } from './utils/timeSlots';

/* global fetchAPI */

const initialFormData = {
  date: '',
  time: '',
  diners: 2,
  occasion: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export const initializeTimes = () => {
  return fetchAPI(new Date());
};

export const updateTimes = (state, action) => {
  if (action.type !== 'UPDATE_TIMES') {
    return state;
  }
  const selectedDate = action.date ? parseLocalDate(action.date) : new Date();
  return fetchAPI(selectedDate);
};

function Main() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

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
        <BookingForm
          date={formData.date}
          time={formData.time}
          diners={formData.diners}
          occasion={formData.occasion}
          availableTimes={availableTimes}
          dispatch={dispatch}
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

export default Main;
