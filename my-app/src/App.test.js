import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading', () => {
  render(<App />);
  const element = screen.getByText(/Map & Filter Example/i);
  expect(element).toBeInTheDocument();
});
