export interface CombinedVehicle {
  id: string;
  fleet: string;
  equipmentId: string;
  name: string;
  plate: string;
  ignition: string;
  lat: number;
  lng: number;
  createdAt: string;

  model?: string;
  nameOwner?: string;
  status?: string;
  type? : string;
}