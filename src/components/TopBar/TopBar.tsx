import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";

type VehicleType = "tracked" | "others";

export default function TopBar({
  onRadioChange,
  searchTerm,
  setSearchTerm,
}: {
  onRadioChange: (value: VehicleType) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) {
  const [selectedValue] = useState<VehicleType>("tracked");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as VehicleType;
    onRadioChange(newValue);
  };

  return (
    <div className="bg-[#000F17] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-[#002D44] border-b-2">
      {/* Parte Esquerda: Título + Rádio */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
        <h3 className="text-white font-semibold">Lista</h3>
        <RadioGroup
          value={selectedValue}
          onChange={handleRadioChange}
          name="radio-buttons-group"
          row
          className="flex flex-wrap gap-2"
        >
          <FormControlLabel
            value="tracked"
            control={
              <Radio
                sx={{
                  color: "#1E90FF",
                  "&.Mui-checked": { color: "#1E90FF" },
                }}
              />
            }
            label={<span className="text-white text-sm">Rastreados</span>}
          />
          <FormControlLabel
            value="others"
            control={
              <Radio
                sx={{
                  color: "#1E90FF",
                  "&.Mui-checked": { color: "#1E90FF" },
                }}
              />
            }
            label={<span className="text-white text-sm">Outros</span>}
          />
        </RadioGroup>
      </div>

      {/* Parte Direita: Campo de busca + Botão */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
        <TextField
          placeholder="Buscar por placa ou frota"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          fullWidth
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#333" },
              "&:hover fieldset": { borderColor: "#555" },
              "&.Mui-focused fieldset": { borderColor: "#1E90FF" },
            },
            "& .MuiInputLabel-root": { color: "#888" },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E90FF",
            "&:hover": { backgroundColor: "#1C86EE" },
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            transition: "background-color 0.3s ease",
          }}
        >
          Novo
        </Button>
      </div>
    </div>
  );
}
