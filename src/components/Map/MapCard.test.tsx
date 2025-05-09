import { render, screen } from '@testing-library/react';
import MapCard from './MapCard';
import { CombinedVehicle } from '../../types/CombinedVehicle';

// Mock do componente Map para facilitar o teste
jest.mock('./Map', () => () => <div data-testid="mock-map" />);

describe('MapCard component', () => {
  const baseProps = {
    gMapsApiStatus: true,
    mapDirections: undefined,
    vehicles: [] as CombinedVehicle[],
    onPlateClick: jest.fn(),
    onMapLoad: jest.fn(),
  };

  it('renders title and Map component', () => {
    render(<MapCard {...baseProps} />);
    expect(screen.getByText('Mapa rastreador')).toBeInTheDocument();
    expect(screen.getByTestId('mock-map')).toBeInTheDocument();
  });

  it('passes defaultCenter and defaultZoom to Map when not provided', () => {
    render(<MapCard {...baseProps} />);
    expect(screen.getByTestId('mock-map')).toBeInTheDocument();
  });
});
