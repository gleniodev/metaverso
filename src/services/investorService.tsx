import axios from "axios";
import { InvestorType } from "../Types/investorType";

const API_URL = "http://localhost:3001/investidores";

//Função para buscar no bd a lista de investidores
export const getInvestor = async (): Promise<InvestorType[]> => {
  try {
    const response = await axios.get<InvestorType[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar investidores:", error);
    throw error;
  }
};

//Função para criar um novo investidor
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

//Função para atualizar um investidor
export const updateInvestor = async (
  id: number,
  investor: Omit<InvestorType, "id">,
): Promise<InvestorType> => {
  try {
    const response = await axios.put<InvestorType>(
      `${API_URL}/${id}`,
      investor,
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar investidor", error);
    throw error;
  }
};

//Função para deletar um investidor
export const deleteInvestor = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Erro ao deletar investidor", error);
    throw error;
  }
};
