import axios from 'axios';
import { ProductType } from '@/Types/produtcType';

const API_URL = 'http://localhost:3001/produtos';

export const getProduct = async (): Promise<ProductType[]> => {
    try {
        const response = await axios.get<ProductType[]>(API_URL);
        return response.data;
    }catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error
    }
}