import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvestor } from "../../services/investorService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

// Definindo configurações de validação do formulário com zod
export const investorSchema = z.object({
  nome: z
    .string()
    .nonempty("Nome é obrigatório")
    .transform((nome) => {
      return nome
        .trim()
        .split(" ")
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(" ");
    }),
  email: z.string().email("Email é obrigatório"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  dataNascimento: z.string().nonempty("Data de nascimento é obrigatória"),
});

type InvestorFormInputs = z.infer<typeof investorSchema>;

interface AddInvestorFormProps {
  onDataUpdate: () => void;
}

export function AddInvestorForm({ onDataUpdate }: AddInvestorFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InvestorFormInputs>({
    resolver: zodResolver(investorSchema),
  });

  const openButtonRef = useRef<HTMLButtonElement | null>(null);

  // Função para fechar o modal e resetar o formulário
  const closeModal = () => {
    reset();
  };

  // Função para submeter o formulário e criar um novo investidor
  const onSubmit = async (data: InvestorFormInputs) => {
    try {
      await createInvestor(data);
      toast.success("Investidor adicionado com Sucesso!");
      setTimeout(() => {
        closeModal();
        onDataUpdate();
      }, 3000);
    } catch (error) {
      console.error("Erro ao salvar investidor:", error);
      toast.error("Erro ao salvar investidor.");
    }
  };

  return (
    <header className="mb-8 flex justify-between">
      <h1 className="text-2xl font-bold">INVESTIDORES</h1>

      <Dialog.Root
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            closeModal();
          }
        }}
      >
        <Dialog.Trigger asChild>
          <button
            ref={openButtonRef}
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
              Novo Investidor
            </Dialog.Title>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full w-full flex-col justify-around"
            >
              <div className="w-full">
                <label htmlFor="nome" className="font-semibold">
                  Nome
                </label>
                <input
                  type="nome"
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("nome")}
                />
                {errors.nome && (
                  <span className="text-red-500">{errors.nome.message}</span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="email" className="font-semibold">
                  E-mail
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="cpf" className="font-semibold">
                  CPF
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("cpf")}
                />
                {errors.cpf && (
                  <span className="text-red-500">{errors.cpf.message}</span>
                )}
              </div>
              <div className="w-full">
                <label htmlFor="dataNascimento" className="font-semibold">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                  {...register("dataNascimento")}
                />
                {errors.dataNascimento && (
                  <span className="text-red-500">
                    {errors.dataNascimento.message}
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
