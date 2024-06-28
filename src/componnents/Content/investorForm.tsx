import * as z from "zod";
import { InvestorType } from "../../Types/investorType";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvestor } from "../../services/investorService";
import { AddButton } from "../Ui/addButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Definindo interface para tipagem dos dados no formulário
interface InvestorFormProps {
  data: InvestorType[];
}

// Definindo configuraçãoes de validação do formulário com zod
export const investorSchema = z.object({
  nome: z
    .string()
    .nonempty("Nome é obrigatório")
    .transform((nome) => {
      return nome
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z.string().email("Email é obrigatório"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  dataNascimento: z.string().nonempty("Data de nascimento é obrigatório"),
});

type InvestorFormInputs = z.infer<typeof investorSchema>;

export function InvestorForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InvestorFormInputs>({
    resolver: zodResolver(investorSchema),
  });

  const closeModal = () => {
    document.getElementById("dialog-close-btn")?.click();
  };

  const onSubmit = async (data: InvestorFormInputs) => {
    try {
      await createInvestor(data);
      toast.success("Investidor adicionado com Sucesso!:");
      // Fechar o modal programaticamente
      setInterval(closeModal, 3000);
    } catch (error) {
      console.error("Erro ao adicionar investidor:", error);
    }
  };

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

          <Dialog.Content className="bg-metaverso-white border-metaverso-blue-ligth fixed left-1/2 top-1/2 flex h-[40rem] min-w-[40rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-3xl border-4 px-10 py-10 shadow-md">
            <Dialog.Title className="mb-10 text-center text-lg font-bold text-black">
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
                  className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
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
                  className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
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
                  className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
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
                  className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
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
                  className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 rounded-lg px-6 font-bold transition duration-300"
                >
                  Salvar
                </button>
                <ToastContainer />

                <Dialog.Close asChild>
                  <button
                    id="dialog-close-btn"
                    type="button"
                    onClick={() => reset()}
                    className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 rounded-lg px-6 font-bold transition duration-300"
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
