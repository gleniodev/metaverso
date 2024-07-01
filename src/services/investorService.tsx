import axios from "axios";
import { InvestorType } from "../Types/investorType";

const API_URL = "http://localhost:3001/investidores";

export const getInvestor = async (): Promise<InvestorType[]> => {
  try {
    const response = await axios.get<InvestorType[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar investidores:", error);
    throw error;
  }
};

export const createInvestor = async (
  investor: Omit<InvestorType, "id">,
): Promise<InvestorType> => {
  try {
    const response = await axios.post<InvestorType>(API_URL, investor);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar investidor", error);
    throw error;
  }
};

export const updateInvestor = async (
  investor: Omit<InvestorType, "id">,
): Promise<InvestorType[]> => {
  try {
    const response = await axios.put<InvestorType[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar investidor", error);
    throw error;
  }
};

export const deleteInvestor = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar investidor", error);
    throw error;
  }
};
