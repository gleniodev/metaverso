import axios from 'axios';
import { InvestorType } from '../Types/investorType'

const API_URL = 'http://localhost:3001/investidores';

export const getInvestor = async (): Promise<InvestorType[]> => {
    try {
        const response = await axios.get<InvestorType[]>(API_URL);
        return response.data;
    }catch (error) {
        console.error('Erro ao buscar investidores:', error);
        throw error
    }
}