import { useState } from 'react';
import { Calendar, Minus, Plus } from 'lucide-react';
import { toLocalISODate, formatTimeLabel, timeStringToMinutes } from './utils/timeSlots';

/* global fetchAPI */

const occasionOptions = ['Birthday', 'Anniversary'];

function getMinDate() {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const todaysSlots = fetchAPI(now);
  const isTodayFullyBooked =
    todaysSlots.length > 0 &&
    todaysSlots.every((slot) => timeStringToMinutes(slot) <= nowMinutes);

  if (!isTodayFullyBooked) {
    return toLocalISODate(now);
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toLocalISODate(tomorrow);
}

function BookingForm({
  date,
  time,
  diners,
  occasion,
  availableTimes,
  dispatch,
  onChange,
  onNext,
}) {
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const minDate = getMinDate();

  function handleDateChange(event) {
    const newDate = event.target.value;
    onChange('date', newDate);
    dispatch({ type: 'UPDATE_TIMES', date: newDate });
    if (dateError) setDateError('');
    if (timeError) setTimeError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!date || date < minDate) {
      setDateError('Please select an upcoming date.');
      return;
    }
    setDateError('');

    if (!availableTimes.includes(time)) {
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
              onChange={handleDateChange}
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
            {availableTimes.map((rawTime) => (
              <button
                key={rawTime}
                type="button"
                className={`TimeOption ${time === rawTime ? 'is-selected' : ''}`}
                role="radio"
                aria-checked={time === rawTime}
                onClick={() => {
                  onChange('time', rawTime);
                  if (timeError) setTimeError('');
                }}
              >
                <span className="TimeOption-radio" />
                {formatTimeLabel(rawTime)}
              </button>
            ))}
          </div>
          {date && availableTimes.length === 0 && (
            <p className="FormField-error">No times available for this date.</p>
          )}
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

        <div className="FormField">
          <span className="FormField-label">Occasion</span>
          <div className="OccasionGroup" role="radiogroup" aria-label="Reservation occasion">
            {occasionOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`Pill ${occasion === option ? 'is-active' : ''}`}
                role="radio"
                aria-checked={occasion === option}
                onClick={() => onChange('occasion', occasion === option ? '' : option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className="Button Button--full">
        Next
      </button>
    </form>
  );
}

export default BookingForm;
