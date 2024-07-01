import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateInvestor } from "../../services/investorService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { InvestorType } from "../../Types/investorType";

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

interface EditInvestorFormProps {
  selectedInvestor: InvestorType | null;
  onDataUpdate: () => void;
  setSelectedInvestor: (investor: InvestorType | null) => void;
  onClose: () => void;
}

export function EditInvestorForm({
  onDataUpdate,
  selectedInvestor,
  setSelectedInvestor,
  onClose,
}: EditInvestorFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InvestorFormInputs>({
    resolver: zodResolver(investorSchema),
  });

  const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<InvestorFormInputs | null>(null);

  useEffect(() => {
    if (selectedInvestor) {
      reset(selectedInvestor);
    }
  }, [selectedInvestor, reset]);

  const closeModal = () => {
    onClose();
    setFormData(null);
    reset();
  };

  const onSubmit = (data: InvestorFormInputs) => {
    if (selectedInvestor) {
      setFormData(data);
      setIsEditConfirmOpen(true);
    }
  };

  const confirmEdit = async () => {
    if (selectedInvestor && formData) {
      try {
        await updateInvestor(selectedInvestor.id, formData);
        toast.success("Investidor atualizado com Sucesso!");
        setTimeout(() => {
          closeModal();
          onDataUpdate();
        }, 3000);
      } catch (error) {
        console.error("Erro ao atualizar investidor:", error);
        toast.error("Erro ao atualizar investidor.");
      }
    }
    setIsEditConfirmOpen(false);
  };

  return (
    <Dialog.Root
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          closeModal();
        }
      }}
      open={Boolean(selectedInvestor)}
    >
      <Dialog.Trigger asChild>
        <button id="edit-btn" className="hidden" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-screen w-full bg-black opacity-65" />
        <Dialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className="bg-metaverso-white border-metaverso-blue-ligth fixed left-1/2 top-1/2 z-[50] flex h-[40rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-3xl border-4 px-10 py-10 shadow-md"
        >
          <Dialog.Title className="mb-5 text-center text-lg font-bold text-black">
            Editar Investidor
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
      <Dialog.Root open={isEditConfirmOpen} onOpenChange={setIsEditConfirmOpen}>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black opacity-30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-6 shadow-md">
          <Dialog.Title className="text-lg font-bold">
            Confirmar Edição
          </Dialog.Title>
          <Dialog.Description className="mt-2">
            Deseja salvar as alterações?
          </Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsEditConfirmOpen(false)}
              className="rounded bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={confirmEdit}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </Dialog.Root>
  );
}
