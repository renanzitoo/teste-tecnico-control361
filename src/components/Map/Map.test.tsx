// Map.test.tsx
import { render, screen } from '@testing-library/react';
import Map from './Map';

// Mock da API do Google Maps
jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: any) => (
    <div data-testid="google-map">
      {/* Simulando a renderização dos filhos */}
      {children}
    </div>
  ),
  DirectionsRenderer: jest.fn(),
}));

// Mock do CustomMarker
jest.mock('./CustomMarker', () => ({
  CustomMarker: () => <div data-testid="custom-marker" />,
}));

describe('Map component', () => {
  const defaultProps = {
    gMapsApiStatus: true,
    mapDirections: undefined,
    vehicles: [],
    onPlateClick: jest.fn(),
    onMapLoad: jest.fn(),
    defaultCenter: { lat: -23.5489, lng: -46.6388 },
    defaultZoom: 8,
  };

  it('renders GoogleMap when gMapsApiStatus is true', () => {
    render(<Map {...defaultProps} />);
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });

  it('renders Skeleton when gMapsApiStatus is false', () => {
    render(<Map {...defaultProps} gMapsApiStatus={false} />);
    expect(screen.getByTestId('skeleton-loading')).toBeInTheDocument();
  });

  it('renders CustomMarker inside GoogleMap', () => {
    render(<Map {...defaultProps} />);
    expect(screen.getByTestId('custom-marker')).toBeInTheDocument();
  });

  
});
  