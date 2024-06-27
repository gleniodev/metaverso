import * as z from "zod";
import { InvestorType } from "../../Types/investorType";
import * as Dialog from "@radix-ui/react-dialog";
import { AddButton } from "../Ui/addButton";

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
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email é obrigatório"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  dataNascimento: z.string().nonempty("Data de nascimento é obrigatório"),
});

export function InvestorForm() {
  return (
    <header className="mb-8 flex justify-between">
      <h1 className="text-2xl font-bold">Investidores</h1>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 rounded-lg px-6 font-bold transition duration-300">
            Adicionar
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 h-screen w-full bg-black opacity-65" />

          <Dialog.Content className="bg-metaverso-white border-metaverso-blue-ligth fixed left-1/2 top-1/2 min-w-[32rem] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border-4 px-10 py-12 shadow-md">
            <Dialog.Title className="mb-10 text-center text-lg font-bold text-black">
              Novo Investidor
            </Dialog.Title>
            <form className="flex h-full w-full flex-col items-start gap-1">
              <div className="w-full">
                <label htmlFor="" className="font-semibold">
                  Nome
                </label>
                <input
                  type="nome"
                  name="nome"
                  className="mb-8 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="" className="font-semibold">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  className="mb-8 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="" className="font-semibold">
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  className="mb-8 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="w-full">
                <label htmlFor="" className="font-semibold">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="nascimento"
                  className="mb-8 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex w-full justify-center gap-5">
                <button className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 rounded-lg px-6 font-bold transition duration-300">
                  Salvar
                </button>
                <button className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 rounded-lg px-6 font-bold transition duration-300">
                  Cancelar
                </button>
              </div>
            </form>

            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
