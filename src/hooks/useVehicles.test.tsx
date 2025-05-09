import { render, screen} from '@testing-library/react';
import { useVehicles } from '../hooks/useVehicles'; // Ajuste para o caminho correto
import { fetchVehicles } from '../services/vehicleServices';

// Mock da função fetchVehicles
jest.mock('../services/vehicleServices');

describe('useVehicles Hook', () => {
  it('should handle the fetch success case correctly', async () => {
    // Simulando sucesso no fetch com uma resposta vazia de veículos
    (fetchVehicles as jest.Mock).mockResolvedValueOnce([]);

    let result: any;
    const TestComponent = () => {
      result = useVehicles('tracked', '', 'fake-api-key');
      return (
        <div>
          {result?.loading ? 'Loading...' : 'Done'}
        </div>
      );
    };

    render(<TestComponent />);

    // Verifica se o texto "Loading..." aparece enquanto o hook está carregando
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Espera até que o "Done" seja exibido depois do carregamento
    await screen.findByText('Done');
  });

  it('should handle the fetch failure case correctly', async () => {
    // Simulando falha no fetch com um erro
    (fetchVehicles as jest.Mock).mockRejectedValueOnce(new Error('Erro ao carregar veículos'));

    let result: any;
    const TestComponent = () => {
      result = useVehicles('tracked', '', 'fake-api-key');
      return (
        <div>
          {result?.loading ? 'Loading...' : 'Error'}
        </div>
      );
    };

    render(<TestComponent />);

    // Verifica se o texto "Loading..." aparece enquanto o hook está carregando
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Espera até que o "Error" seja exibido após falha na requisição
    await screen.findByText('Error');
  });
});
