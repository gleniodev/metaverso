import axios from 'axios';
import { InvestmentType } from '../Types/investmentType'

const API_URL = 'http://localhost:3001/investimentos';

export const getInvestment = async (): Promise<InvestmentType[]> => {
    try {
        const response = await axios.get<InvestmentType[]>(API_URL);
        return response.data;
    }catch (error) {
        console.error('Erro ao buscar investimentos:', error);
        throw error
    }
}