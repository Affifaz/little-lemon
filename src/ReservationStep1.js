import { Calendar, Minus, Plus } from 'lucide-react';

const timeSlots = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

function ReservationStep1({ date, time, diners, onChange, onNext }) {
  function handleSubmit(event) {
    event.preventDefault();
    onNext();
  }

  return (
    <form className="ReserveForm" onSubmit={handleSubmit}>
      <div className="ReserveForm-fields">
        <div className="FormField">
          <label htmlFor="reserve-date" className="FormField-label">
            Date
          </label>
          <div className="DateInput">
            <Calendar size={18} className="DateInput-icon" />
            <input
              type="date"
              id="reserve-date"
              className="DateInput-field"
              value={date}
              onChange={(event) => onChange('date', event.target.value)}
            />
          </div>
        </div>

        <div className="FormField">
          <span className="FormField-label">Time</span>
          <div className="TimeGrid" role="radiogroup" aria-label="Reservation time">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`TimeOption ${time === slot ? 'is-selected' : ''}`}
                role="radio"
                aria-checked={time === slot}
                onClick={() => onChange('time', slot)}
              >
                <span className="TimeOption-radio" />
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="FormField">
          <span className="FormField-label">Number of Diners</span>
          <div className="Stepper">
            <button
              type="button"
              className="Stepper-button"
              aria-label="Decrease number of diners"
              onClick={() => onChange('diners', Math.max(1, diners - 1))}
            >
              <Minus size={18} />
            </button>
            <span className="Stepper-value" aria-live="polite">
              {diners}
            </span>
            <button
              type="button"
              className="Stepper-button"
              aria-label="Increase number of diners"
              onClick={() => onChange('diners', Math.min(20, diners + 1))}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <button type="submit" className="Button Button--full">
        Next
      </button>
    </form>
  );
}

export default ReservationStep1;
