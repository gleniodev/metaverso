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
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(investor),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar investidor");
  }
  return response.json();
};

export const updateInvestor = async (
  investor: Omit<InvestorType, "id">,
): Promise<InvestorType> => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(investor),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar investidor!");
  }
  return response.json();
};
