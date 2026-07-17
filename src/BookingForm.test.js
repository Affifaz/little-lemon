import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

function getFutureDateString(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function renderBookingForm(overrides = {}) {
  const props = {
    date: '',
    time: '',
    diners: 2,
    occasion: '',
    availableTimes: ['17:00', '18:00'],
    dispatch: jest.fn(),
    onChange: jest.fn(),
    onNext: jest.fn(),
    ...overrides,
  };
  render(<BookingForm {...props} />);
  return props;
}

describe('BookingForm - HTML attributes', () => {
  beforeEach(() => {
    global.fetchAPI = jest.fn(() => ['17:00', '18:00']);
  });

  afterEach(() => {
    delete global.fetchAPI;
  });

  test('date field is a native date input with a min attribute', () => {
    renderBookingForm();
    const dateInput = screen.getByLabelText('Date');

    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('min');
  });
});

describe('BookingForm - validation', () => {
  beforeEach(() => {
    global.fetchAPI = jest.fn(() => ['17:00', '18:00']);
  });

  afterEach(() => {
    delete global.fetchAPI;
  });

  test('shows an error and does not advance when no date is selected', () => {
    const { onNext } = renderBookingForm({ date: '', time: '17:00' });

    userEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText(/please select an upcoming date/i)).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  test('shows an error and does not advance when the selected time is unavailable', () => {
    const futureDate = getFutureDateString(3);
    const { onNext } = renderBookingForm({
      date: futureDate,
      time: '',
      availableTimes: ['17:00'],
    });

    userEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText(/please select an available time/i)).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  test('advances to the next step when date and time are both valid', () => {
    const futureDate = getFutureDateString(3);
    const { onNext } = renderBookingForm({
      date: futureDate,
      time: '17:00',
      availableTimes: ['17:00'],
    });

    userEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  test('dispatches UPDATE_TIMES with the new date when the date field changes', () => {
    const futureDate = getFutureDateString(5);
    const { dispatch, onChange } = renderBookingForm();

    fireEvent.change(screen.getByLabelText('Date'), { target: { value: futureDate } });

    expect(onChange).toHaveBeenCalledWith('date', futureDate);
    expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', date: futureDate });
  });
});
