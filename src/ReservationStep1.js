import { useState } from 'react';
import { Calendar, Minus, Plus } from 'lucide-react';

const timeSlots = [
  { label: '5:00 PM', hour: 17 },
  { label: '6:00 PM', hour: 18 },
  { label: '7:00 PM', hour: 19 },
  { label: '8:00 PM', hour: 20 },
];

function toLocalISODate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getAvailability(selectedDate) {
  const now = new Date();
  const todayStr = toLocalISODate(now);
  const lastSlotHour = timeSlots[timeSlots.length - 1].hour;
  const isTodayFullyBooked = now.getHours() >= lastSlotHour;

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = isTodayFullyBooked ? toLocalISODate(tomorrow) : todayStr;
  const isSelectedDateToday = selectedDate === todayStr;

  return {
    minDate,
    isSlotDisabled: (slot) => isSelectedDateToday && slot.hour <= now.getHours(),
  };
}

function ReservationStep1({ date, time, diners, onChange, onNext }) {
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const { minDate, isSlotDisabled } = getAvailability(date);

  function handleSubmit(event) {
    event.preventDefault();
    const availability = getAvailability(date);

    if (!date || date < availability.minDate) {
      setDateError('Please select an upcoming date.');
      return;
    }
    setDateError('');

    const selectedSlot = timeSlots.find((slot) => slot.label === time);
    if (!selectedSlot || availability.isSlotDisabled(selectedSlot)) {
      setTimeError('Please select an available time.');
      return;
    }
    setTimeError('');

    onNext();
  }

  return (
    <form className="ReserveForm" onSubmit={handleSubmit} noValidate>
      <div className="ReserveForm-fields">
        <div className="FormField">
          <label htmlFor="reserve-date" className="FormField-label">
            Date
          </label>
          <div className={`DateInput ${dateError ? 'is-invalid' : ''}`}>
            <Calendar size={18} className="DateInput-icon" />
            <input
              type="date"
              id="reserve-date"
              className="DateInput-field"
              value={date}
              min={minDate}
              onChange={(event) => {
                onChange('date', event.target.value);
                if (dateError) setDateError('');
                if (timeError) setTimeError('');
              }}
              aria-invalid={Boolean(dateError)}
              aria-describedby={dateError ? 'reserve-date-error' : undefined}
            />
          </div>
          {dateError && (
            <p id="reserve-date-error" className="FormField-error">
              {dateError}
            </p>
          )}
        </div>

        <div className="FormField">
          <span className="FormField-label">Time</span>
          <div className="TimeGrid" role="radiogroup" aria-label="Reservation time">
            {timeSlots.map((slot) => {
              const disabled = isSlotDisabled(slot);
              return (
                <button
                  key={slot.label}
                  type="button"
                  className={`TimeOption ${time === slot.label ? 'is-selected' : ''}`}
                  role="radio"
                  aria-checked={time === slot.label}
                  disabled={disabled}
                  onClick={() => {
                    onChange('time', slot.label);
                    if (timeError) setTimeError('');
                  }}
                >
                  <span className="TimeOption-radio" />
                  {slot.label}
                </button>
              );
            })}
          </div>
          {timeError && <p className="FormField-error">{timeError}</p>}
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
