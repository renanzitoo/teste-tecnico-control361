import { useCallback, useEffect, useState } from "react";
import { fetchVehicles } from "../services/vehicleServices";
import { Vehicle } from "../types/Vehicle";

interface CombinedVehicle extends Vehicle {
  model?: string;
  nameOwner?: string;
  status?: string;
  type?: string;
}

type VehicleType = "tracked" | "others";

let scrollTimeout: NodeJS.Timeout;

export const useVehicles = (
  vehicleType: VehicleType,
  searchTerm: string,
  apiKey: string
) => {
  const [vehicles, setVehicles] = useState<CombinedVehicle[]>([]);
  const [page, setPage] = useState(20);
  const [loading, setLoading] = useState(false);

  const loadVehicles = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newVehicles = await fetchVehicles(page, vehicleType, apiKey);
      setVehicles(newVehicles);

    } catch (err) {
      console.error("Erro ao carregar veículos:", err);
    } finally {
      setLoading(false);
    }
  }, [page, vehicleType, apiKey, loading]);

  useEffect(() => {
    setVehicles([]);
    setPage(20);
  }, [vehicleType]);

  useEffect(() => {
    if (searchTerm === "" && page <= 60) {
      loadVehicles();
    }
  }, [page, vehicleType, searchTerm, loadVehicles]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadVehicles();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loadVehicles]);

  const filtered = vehicles.filter((vehicle) => {
    const search = searchTerm.toLowerCase();
    return (
      vehicle.plate?.toLowerCase().includes(search) ||
      vehicle.fleet?.toLowerCase().includes(search)
    );
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (
        searchTerm === "" &&
        page <= 80 &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
      ) {
        setPage((prev) => prev + 20);
      }
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  

  return {
    vehicles: filtered,
    loading,
    setPage,
    page,
    refresh: loadVehicles,
    reset: () => {
      setVehicles([]);
      setPage(20);
    },
  };
};
