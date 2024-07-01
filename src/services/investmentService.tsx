import axios from "axios";
import { InvestmentType } from "../Types/investmentType";

const API_URL = "http://localhost:3001/investimentos";

export const getInvestment = async (): Promise<InvestmentType[]> => {
  try {
    const response = await axios.get<InvestmentType[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar investimentos:", error);
    throw error;
  }
};

export const createInvestment = async (
  investment: Omit<InvestmentType, "id">,
): Promise<InvestmentType> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(investment),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar investimento");
  }
  return response.json();
};

export const updateInvestment = async (
  investment: Omit<InvestmentType, "id">,
): Promise<InvestmentType> => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(investment),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar investimento!");
  }
  return response.json();
};
