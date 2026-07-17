const fields = [
  { key: 'firstName', label: 'First Name', type: 'text', autoComplete: 'given-name' },
  { key: 'lastName', label: 'Last Name', type: 'text', autoComplete: 'family-name' },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { key: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
];

function ReservationStep2({ values, onChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="ReserveForm" onSubmit={handleSubmit}>
      <div className="ReserveForm-fields">
        {fields.map((field) => (
          <div className="FormField" key={field.key}>
            <label htmlFor={`reserve-${field.key}`} className="FormField-label">
              {field.label}
            </label>
            <input
              type={field.type}
              id={`reserve-${field.key}`}
              className="TextInput"
              autoComplete={field.autoComplete}
              value={values[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
              required
            />
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
