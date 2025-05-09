import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () => {
  it('renders the header text correctly', () => {
    render(<Header />);
    expect(screen.getByText('Renan Cristiano Costa')).toBeInTheDocument();
  });
});
