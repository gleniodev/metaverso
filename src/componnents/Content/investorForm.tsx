import * as z from 'zod';
import { InvestorType } from '../../Types/investorType';

// Definindo interface para tipagem dos dados no formulário
interface InvestorFormProps {
    data: InvestorType[];
  }
export interface Investor {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    dataNasciento: string;
}
// Definindo configuraçãoes de validação do formulário com zod
export const investorSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email é obrigatório'),
    cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
    dataNascimento: z.string().nonempty('Data de nascimento é obrigatório')
})

export function InvestorForm(){
    return(
        <main className='h-screen bg-white text-sky-950'></main>

    )
}