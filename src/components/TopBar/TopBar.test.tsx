import { render, screen, fireEvent } from "@testing-library/react";
import TopBar from "./TopBar";

describe("TopBar", () => {
  it("renders labels and input correctly", () => {
    render(
      <TopBar
        onRadioChange={() => {}}
        searchTerm=""
        setSearchTerm={() => {}}
      />
    );

    expect(screen.getByText("Lista")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar por placa ou frota")).toBeInTheDocument();
    expect(screen.getByText("Novo")).toBeInTheDocument();
    expect(screen.getByLabelText("Rastreados")).toBeInTheDocument();
    expect(screen.getByLabelText("Outros")).toBeInTheDocument();
  });

  it("calls onRadioChange when radio is changed", () => {
    const handleRadioChange = jest.fn();

    render(
      <TopBar
        onRadioChange={handleRadioChange}
        searchTerm=""
        setSearchTerm={() => {}}
      />
    );

    fireEvent.click(screen.getByLabelText("Outros"));
    expect(handleRadioChange).toHaveBeenCalledWith("others");
  });

  it("calls setSearchTerm when text input changes", () => {
    const handleSearch = jest.fn();

    render(
      <TopBar
        onRadioChange={() => {}}
        searchTerm=""
        setSearchTerm={handleSearch}
      />
    );

    const input = screen.getByPlaceholderText("Buscar por placa ou frota");
    fireEvent.change(input, { target: { value: "ABC1234" } });
    expect(handleSearch).toHaveBeenCalledWith("ABC1234");
  });
});
