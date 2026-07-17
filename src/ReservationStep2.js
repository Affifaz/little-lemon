import { useState } from 'react';

const fields = [
  { key: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
  { key: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { key: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{7,15}$/;

function validate(values) {
  const errors = {};

  fields.forEach((field) => {
    if (!values[field.key].trim()) {
      errors[field.key] = `${field.label} is required.`;
    }
  });

  if (!errors.email && !emailPattern.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!errors.phone && !phonePattern.test(values.phone)) {
    errors.phone = 'Enter a valid phone number (digits only).';
  }

  return errors;
}

function ReservationStep2({ values, onChange, onSubmit }) {
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSubmit();
    }
  }

  function handleFieldChange(key, value) {
    const nextValue = key === 'phone' ? value.replace(/\D/g, '') : value;
    onChange(key, nextValue);
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  return (
    <form className="ReserveForm" onSubmit={handleSubmit} noValidate>
      <div className="ReserveForm-fields">
        {fields.map((field) => (
          <div className="FormField" key={field.key}>
            <label htmlFor={`reserve-${field.key}`} className="FormField-label">
              {field.label}
            </label>
            <input
              type={field.type}
              id={`reserve-${field.key}`}
              className={`TextInput ${errors[field.key] ? 'is-invalid' : ''}`}
              autoComplete={field.autoComplete}
              inputMode={field.key === 'phone' ? 'numeric' : undefined}
              maxLength={field.key === 'phone' ? 15 : undefined}
              value={values[field.key]}
              onChange={(event) => handleFieldChange(field.key, event.target.value)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={errors[field.key] ? `reserve-${field.key}-error` : undefined}
            />
            {errors[field.key] && (
              <p id={`reserve-${field.key}-error`} className="FormField-error">
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}
      </div>

      <button type="submit" className="Button Button--full">
        Confirm Booking
      </button>
    </form>
  );
}

export default ReservationStep2;
