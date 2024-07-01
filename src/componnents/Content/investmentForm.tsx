import React, { useEffect, useState } from "react";
import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvestment } from "../../services/investmentService";
import { getInvestor } from "../../services/investorService";
import { getAtivo } from "../../services/ativoService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Schema de validação para o formulário de investimentos usando Zod
export const investmentSchema = z.object({
  nomeInvestidor: z.string().nonempty("Investidor é obrigatório"), // Campo obrigatório para o nome do investidor
  nomeAtivo: z.string().nonempty("Ativo é obrigatório"), // Campo obrigatório para o nome do ativo
  valor: z.number().positive("Valor deve ser positivo"), // Campo obrigatório e deve ser um número positivo
  dataInvestimento: z.string().nonempty("Data de investimento é obrigatória"), // Campo obrigatório para a data de investimento
  rendimento: z.number().positive("Rendimento deve ser positivo"), // Campo obrigatório e deve ser um número positivo
});

// Tipo inferido do schema de validação
type InvestmentFormInputs = z.infer<typeof investmentSchema>;

interface InvestmentFormProps {
  onDataUpdate: () => void;
}

export function InvestmentForm({ onDataUpdate }: InvestmentFormProps) {
  // Configuração do hook useForm com validação Zod
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InvestmentFormInputs>({
    resolver: zodResolver(investmentSchema),
  });

  // Estados para armazenar os investidores e ativos
  const [investors, setInvestors] = useState<{ id: number; nome: string }[]>(
    [],
  );
  const [ativos, setAtivos] = useState<{ id: number; nome: string }[]>([]);

  // Efeito para buscar dados de investidores e ativos quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const investorsData = await getInvestor();
        const ativosData = await getAtivo();
        setInvestors(investorsData);
        setAtivos(ativosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Função para fechar o modal programaticamente
  const closeModal = () => {
    document.getElementById("dialog-close-btn")?.click();
  };

  // Função para lidar com o envio do formulário
  const onSubmit = async (data: InvestmentFormInputs) => {
    try {
      await createInvestment(data);
      toast.success("Investimento adicionado com Sucesso!");
      setInterval(closeModal, 3000); // Fechar o modal programaticamente após 3 segundos
      onDataUpdate(); // Chamar a função de atualização dos dados da tabela
    } catch (error) {
      console.error("Erro ao adicionar investimento:", error);
      toast.error("Erro ao adicionar investimento.");
    }
  };

  return (
    <header className="mb-8 flex justify-between">
      <h1 className="text-2xl font-bold">INVESTIMENTOS</h1>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 rounded-lg px-6 font-bold transition duration-300">
            Adicionar
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 h-screen w-full bg-black opacity-65" />

          <Dialog.Content
            onEscapeKeyDown={(e) => e.preventDefault()} // Prevenir fechamento ao pressionar tecla ESC
            onPointerDownOutside={(e) => e.preventDefault()} // Prevenir fechamento ao clicar fora do modal
            className="bg-metaverso-white border-metaverso-blue-ligth fixed left-1/2 top-1/2 flex h-[40rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-3xl border-4 px-10 py-10 shadow-md"
          >
            <Dialog.Title className="mb-5 text-center text-lg font-bold text-black">
              NOVO INVESTIMENTO
            </Dialog.Title>
            <form
              onSubmit={handleSubmit(onSubmit)} // Handle do envio do formulário
              className="flex h-full w-full flex-col justify-around"
            >
              <div className="w-full">
                <label htmlFor="nomeInvestidor" className="font-semibold">
                  Investidor
                </label>
                <select
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("nomeInvestidor")} // Registro do campo no react-hook-form
                >
                  <option value="">Selecione um investidor</option>
                  {investors.map((investor) => (
                    <option key={investor.id} value={investor.nome}>
                      {investor.nome}
                    </option>
                  ))}
                </select>
                {errors.nomeInvestidor && (
                  <span className="text-red-500">
                    {errors.nomeInvestidor.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="nomeAtivo" className="font-semibold">
                  Ativo
                </label>
                <select
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("nomeAtivo")} // Registro do campo no react-hook-form
                >
                  <option value="">Selecione um ativo</option>
                  {ativos.map((ativo) => (
                    <option key={ativo.id} value={ativo.nome}>
                      {ativo.nome}
                    </option>
                  ))}
                </select>
                {errors.nomeAtivo && (
                  <span className="text-red-500">
                    {errors.nomeAtivo.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="valor" className="font-semibold">
                  Valor
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("valor", { valueAsNumber: true })} // Registro do campo no react-hook-form
                />
                {errors.valor && (
                  <span className="text-red-500">{errors.valor.message}</span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="dataInvestimento" className="font-semibold">
                  Data de Investimento
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("dataInvestimento")} // Registro do campo no react-hook-form
                />
                {errors.dataInvestimento && (
                  <span className="text-red-500">
                    {errors.dataInvestimento.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="rendimento" className="font-semibold">
                  Rendimento
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("rendimento", { valueAsNumber: true })} // Registro do campo no react-hook-form
                />
                {errors.rendimento && (
                  <span className="text-red-500">
                    {errors.rendimento.message}
                  </span>
                )}
              </div>
              <div className="flex w-full justify-center gap-5">
                <button
                  type="submit"
                  className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 min-w-28 rounded-lg px-6 font-bold transition duration-300"
                >
                  Salvar
                </button>
                <ToastContainer />

                <Dialog.Close asChild>
                  <button
                    id="dialog-close-btn"
                    type="button"
                    onClick={() => reset()} // Resetar formulário ao cancelar
                    className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 min-w-28 rounded-lg px-6 font-bold transition duration-300"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
