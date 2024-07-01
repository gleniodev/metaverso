import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvestment } from "../../services/investmentService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field"; // Importa a biblioteca de máscara de entrada
import { InvestmentType } from "@/Types/investmentType";
import { getInvestor } from "@/services/investorService";
import { getAtivo } from "@/services/ativoService";

// Definindo configurações de validação do formulário com zod
export const investmentSchema = z.object({
  nomeInvestidor: z.string().nonempty("Nome do investidor é obrigatório"),
  nomeAtivo: z.string().nonempty("Nome do ativo é obrigatório"),
  valor: z
    .string()
    .nonempty("Valor é obrigatório")
    .transform((val) => parseFloat(val.replace(/[^\d.-]/g, "")))
    .refine((val) => !isNaN(val), { message: "Valor deve ser um número" }),
  dataInvestimento: z.string().nonempty("Data de investimento é obrigatória"),
  rendimento: z
    .string()
    .nonempty("Rendimento é obrigatório")
    .transform((val) => parseFloat(val.replace(/[^\d.-]/g, "")))
    .refine((val) => !isNaN(val), { message: "Rendimento deve ser um número" }),
});

type InvestmentFormInputs = z.infer<typeof investmentSchema>;

interface AddInvestmentFormProps {
  onDataUpdate: () => void;
}

export function AddInvestmentForm({ onDataUpdate }: AddInvestmentFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
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

  // Função para fechar o modal e resetar o formulário
  const closeModal = () => {
    reset();
  };

  // Função para submeter o formulário e criar um novo investimento
  const onSubmit = async (data: InvestmentFormInputs) => {
    try {
      await createInvestment(data as unknown as InvestmentType);
      toast.success("Investimento adicionado com sucesso!");
      setTimeout(() => {
        closeModal();
        onDataUpdate();
      }, 3000);
    } catch (error) {
      console.error("Erro ao salvar investimento:", error);
      toast.error("Erro ao salvar investimento.");
    }
  };

  return (
    <header className="mb-8 flex justify-between">
      <h1 className="text-2xl font-bold">INVESTIMENTOS</h1>

      <Dialog.Root
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeModal();
          }
        }}
      >
        <Dialog.Trigger asChild>
          <button
            id="add-btn"
            className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 rounded-lg px-6 font-bold transition duration-300"
          >
            Adicionar
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 h-screen w-full bg-black opacity-65" />

          <Dialog.Content
            onEscapeKeyDown={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            className="bg-metaverso-white border-metaverso-blue-ligth fixed left-1/2 top-1/2 z-[50] flex h-[40rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-3xl border-4 px-10 py-10 shadow-md"
          >
            <Dialog.Title className="mb-5 text-center text-lg font-bold text-black">
              Novo Investimento
            </Dialog.Title>
            <form
              onSubmit={handleSubmit(onSubmit)}
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
                <CurrencyInput
                  id="valor"
                  placeholder="R$ 0,00"
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  onValueChange={(value) =>
                    setValue(
                      "valor",
                      value
                        ? parseFloat(value.replace(/\./g, "").replace(",", "."))
                        : 0,
                    )
                  }
                  {...register("valor")}
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
                  {...register("dataInvestimento")}
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
                <CurrencyInput
                  id="rendimento"
                  placeholder="R$ 0,00"
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  onValueChange={(value) =>
                    setValue(
                      "rendimento",
                      value
                        ? parseFloat(value.replace(/\./g, "").replace(",", "."))
                        : 0,
                    )
                  }
                  {...register("rendimento")}
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
                    type="button"
                    onClick={closeModal}
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
