import { render, screen, fireEvent } from '@testing-library/react';
import { CustomTable }  from './CustomTable';
import { CombinedVehicle } from '../../types/CombinedVehicle';

beforeAll(() => {
  // Mock scrollTo
  window.scrollTo = jest.fn();
});

describe('CustomTable', () => {
  const mockVehicles: CombinedVehicle[] = [
    {
      plate: 'ABC1234',
      fleet: 'Frota 1',
      type: 'vehicle',
      model: 'Modelo X',
      status: 'outro',
      lat: -23.5,
      lng: -46.6,
      id: '',
      equipmentId: '',
      name: '',
      ignition: '',
      createdAt: ''
    },
    {
      plate: 'XYZ5678',
      fleet: 'Frota 2',
      type: 'implement',
      model: 'Modelo Y',
      status: 'active',
      lat: -23.6,
      lng: -46.7,
      id: '',
      equipmentId: '',
      name: '',
      ignition: '',
      createdAt: ''
    },
  ];

  it('renders vehicle data in the table', () => {
    render(<CustomTable locationVehicles={mockVehicles} onPlateClick={() => {}} />);
    
    expect(screen.getByText('ABC1234')).toBeInTheDocument();
    expect(screen.getByText('Frota 1')).toBeInTheDocument();
    expect(screen.getByText('Motor')).toBeInTheDocument();
    expect(screen.getByText('Modelo Y')).toBeInTheDocument(); 
    expect(screen.getByText('A caminho')).toBeInTheDocument();

    expect(screen.getByText('XYZ5678')).toBeInTheDocument();
    expect(screen.getByText('Implemento')).toBeInTheDocument();
  });

  it('calls onPlateClick with lat and lng when plate is clicked', () => {
    const handleClick = jest.fn();
    render(<CustomTable locationVehicles={mockVehicles} onPlateClick={handleClick} />);

    const plateCell = screen.getByText('ABC1234');
    fireEvent.click(plateCell);

    expect(handleClick).toHaveBeenCalledWith(-23.5, -46.6);
  });
});
