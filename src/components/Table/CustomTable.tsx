import {
  TableContainer,
  TableHead,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { CombinedVehicle } from "../../types/CombinedVehicle";

interface CustomTableProps {
  locationVehicles: CombinedVehicle[];
  onPlateClick: (lat: number, lng: number) => void;
}

export const CustomTable = ({ locationVehicles, onPlateClick }: CustomTableProps) => {
  const Cars = locationVehicles;
  const borderStyle = "1px solid #003344";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#001623",
        borderRadius: "12px",
        overflowX: "auto", 
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
        size={isMobile ? "small" : "medium"} 
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#001622" }}>
            {["Placa", "Frota", "Tipo", "Modelo", "Status"].map((header, index) => (
              <TableCell
                key={index}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderRight: index < 4 ? borderStyle : "none",
                  borderBottom: borderStyle,
                  whiteSpace: "nowrap",
                  px: isMobile ? 1 : 2,
                  py: isMobile ? 0.5 : 1,
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Cars.map((car, index) => (
            <TableRow
              key={index}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#01263b" },
                "&:hover": { backgroundColor: "#003244" },
              }}
            >
              <TableCell
                sx={{
                  color: "#00AEEF",
                  cursor: "pointer",
                  borderRight: borderStyle,
                  px: isMobile ? 1 : 2,
                }}
                onClick={() => {
                  if (car.lat && car.lng) {
                    onPlateClick(car.lat, car.lng);
                    window.scrollTo({ top: 100, behavior: "smooth" });
                  }
                }}
              >
                {car.plate}
              </TableCell>
              <TableCell sx={{ color: "white", borderRight: borderStyle, px: isMobile ? 1 : 2 }}>
                {car.fleet}
              </TableCell>
              <TableCell sx={{ color: "white", borderRight: borderStyle, px: isMobile ? 1 : 2 }}>
                {car.type === "vehicle" ? "Motor" : car.type === "implement" ? "Implemento" : "Outro"}
              </TableCell>
              <TableCell sx={{ color: "white", borderRight: borderStyle, px: isMobile ? 1 : 2 }}>
                {car.model}
              </TableCell>
              <TableCell sx={{ color: "white", px: isMobile ? 1 : 2 }}>
                {car.status === "active" ? "A caminho" : "Desconhecido"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
