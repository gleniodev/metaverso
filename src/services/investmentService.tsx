import axios from "axios";
import { InvestmentType } from "../Types/investmentType";

const API_URL = "http://localhost:3001/investimentos";

//Função para buscar no bd a lista de investimentos
export const getInvestment = async (): Promise<InvestmentType[]> => {
  try {
    const response = await axios.get<InvestmentType[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar investimento:", error);
    throw error;
  }
};

//Função para criar um novo investimento
export const createInvestment = async (
  investment: InvestmentType,
): Promise<InvestmentType> => {
  try {
    const response = await axios.post<InvestmentType>(API_URL, investment);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar investimento", error);
    throw error;
  }
};

//Função para atualizar um investimento
export const updateInvestment = async (
  id: number,
  investment: Omit<InvestmentType, "id">,
): Promise<InvestmentType> => {
  try {
    const response = await axios.put<InvestmentType>(
      `${API_URL}/${id}`,
      investment,
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar investimento", error);
    throw error;
  }
};

//Função para deletar um investimento
export const deleteInvestment = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar investimento", error);
    throw error;
  }
};
