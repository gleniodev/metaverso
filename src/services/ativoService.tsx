import axios from "axios";
import { AtivoType } from "@/Types/ativoType";

const API_URL = "http://localhost:3001/ativos";

export const getAtivo = async (): Promise<AtivoType[]> => {
  try {
    const response = await axios.get<AtivoType[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar ativos:", error);
    throw error;
  }
};
