import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the Little Lemon heading', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const heading = screen.getByRole('heading', { name: /little lemon/i });
  expect(heading).toBeInTheDocument();
});
