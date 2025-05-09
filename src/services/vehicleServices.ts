// src/services/vehicleService.ts
import { Vehicle } from "../types/Vehicle";
import { VehicleInfo } from "../types/VehicleInfo";

interface CombinedVehicle extends Vehicle {
  model?: string;
  nameOwner?: string;
  status?: string;
  type?: string;
}

export const fetchVehicles = async (
  page: number,
  type: "tracked" | "others",
  token: string
): Promise<CombinedVehicle[]> => {
  const response = await fetch(
    `https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate?type=${type}&page=1&perPage=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const vehicles: VehicleInfo[] = data.content.vehicles;
  const locationVehicles: Vehicle[] = data.content.locationVehicles;

  const seenPlates = new Set<string>();

  const combined = locationVehicles
    .map((loc) => {
      const match = vehicles.find((v) => v.plate === loc.plate);
      return {
        ...loc,
        model: match?.model,
        nameOwner: match?.nameOwner,
        status: match?.status,
        type: match?.type,
      };
    })
    .filter((vehicle) => {
      if (!vehicle.plate || seenPlates.has(vehicle.plate)) return false;
      seenPlates.add(vehicle.plate);
      return true;
    });

  return combined;
};
