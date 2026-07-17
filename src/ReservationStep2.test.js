import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReservationStep2 from './ReservationStep2';

const emptyValues = { firstName: '', lastName: '', email: '', phone: '' };
const validValues = {
  firstName: 'Maria',
  lastName: 'Alvarez',
  email: 'maria@example.com',
  phone: '5551234567',
};

function renderStep2(values) {
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  render(<ReservationStep2 values={values} onChange={onChange} onSubmit={onSubmit} />);
  return { onChange, onSubmit };
}

describe('ReservationStep2 - HTML attributes', () => {
  test('First Name and Last Name fields are text inputs', () => {
    renderStep2(emptyValues);

    expect(screen.getByLabelText('First Name')).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Last Name')).toHaveAttribute('type', 'text');
  });

  test('Email field is an email input', () => {
    renderStep2(emptyValues);

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  test('Phone field is a tel input with a numeric input mode and max length', () => {
    renderStep2(emptyValues);
    const phoneInput = screen.getByLabelText('Phone');

    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(phoneInput).toHaveAttribute('inputmode', 'numeric');
    expect(phoneInput).toHaveAttribute('maxlength', '15');
  });
});

describe('ReservationStep2 - validation', () => {
  test('shows a required error for every empty field and blocks submission', () => {
    const { onSubmit } = renderStep2(emptyValues);

    userEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

    expect(screen.getByText('First Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Phone is required.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('shows an error for a malformed email and blocks submission', () => {
    const { onSubmit } = renderStep2({ ...validValues, email: 'not-an-email' });

    userEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('shows an error for a phone number that is too short and blocks submission', () => {
    const { onSubmit } = renderStep2({ ...validValues, phone: '123' });

    userEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

    expect(screen.getByText(/enter a valid phone number/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('strips non-digit characters as the user types into the phone field', () => {
    const { onChange } = renderStep2(emptyValues);
    const phoneInput = screen.getByLabelText('Phone');

    userEvent.type(phoneInput, 'abc123');

    const phoneCalls = onChange.mock.calls.filter(([field]) => field === 'phone');
    expect(phoneCalls.length).toBeGreaterThan(0);
    phoneCalls.forEach(([, value]) => {
      expect(value).toMatch(/^\d*$/);
    });
  });

  test('submits successfully when every field is valid', () => {
    const { onSubmit } = renderStep2(validValues);

    userEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
  });
});
