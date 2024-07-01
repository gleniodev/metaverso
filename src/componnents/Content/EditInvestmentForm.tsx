// import * as z from "zod";
// import * as Dialog from "@radix-ui/react-dialog";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { updateInvestment } from "../../services/investmentService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useEffect, useState } from "react";
// import CurrencyInput from "react-currency-input-field"; // Importa a biblioteca de máscara de entrada
// import { InvestmentType } from "../../Types/investmentType";
// import { getInvestor } from "@/services/investorService";
// import { getAtivo } from "@/services/ativoService";

// // Definindo configurações de validação do formulário com zod
// export const investmentSchema = z.object({
//   nomeInvestidor: z.string().nonempty("Nome do investidor é obrigatório"),
//   nomeAtivo: z.string().nonempty("Nome do ativo é obrigatório"),
//   valor: z
//     .string()
//     .nonempty("Valor é obrigatório")
//     .transform((val) => parseFloat(val.replace(/[^\d.-]/g, "")))
//     .refine((val) => !isNaN(val), { message: "Valor deve ser um número" }),
//   dataInvestimento: z.string().nonempty("Data de investimento é obrigatória"),
//   rendimento: z
//     .string()
//     .nonempty("Rendimento é obrigatório")
//     .transform((val) => parseFloat(val.replace(/[^\d.-]/g, "")))
//     .refine((val) => !isNaN(val), { message: "Rendimento deve ser um número" }),
// });

// type InvestmentFormInputs = z.infer<typeof investmentSchema>;

// interface EditInvestmentFormProps {
//   selectedInvestment: InvestmentType | null;
//   onDataUpdate: () => void;
//   setSelectedInvestment: (investment: InvestmentType | null) => void;
//   onClose: () => void;
// }

// export function EditInvestmentForm({
//   onDataUpdate,
//   selectedInvestment,
//   setSelectedInvestment,
//   onClose,
// }: EditInvestmentFormProps) {
//   const {
//     register,
//     reset,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<InvestmentFormInputs>({
//     resolver: zodResolver(investmentSchema),
//   });

//   const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);
//   const [formData, setFormData] = useState<InvestmentFormInputs | null>(null);
//   const [investors, setInvestors] = useState<{ id: number; nome: string }[]>(
//     [],
//   );
//   const [ativos, setAtivos] = useState<{ id: number; nome: string }[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const investorsData = await getInvestor();
//         const ativosData = await getAtivo();
//         setInvestors(investorsData);
//         setAtivos(ativosData);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedInvestment) {
//       reset(selectedInvestment);
//     }
//   }, [selectedInvestment, reset]);

//   const closeModal = () => {
//     onClose();
//     setFormData(null);
//     reset();
//   };

//   const onSubmit = (data: InvestmentFormInputs) => {
//     if (selectedInvestment) {
//       setFormData(data);
//       setIsEditConfirmOpen(true);
//     }
//   };

//   const confirmEdit = async () => {
//     if (selectedInvestment && formData) {
//       try {
//         const updatedInvestment: InvestmentType = {
//           ...selectedInvestment,
//           ...formData,
//         };
//         await updateInvestment(selectedInvestment.id, updatedInvestment);
//         toast.success("Investimento atualizado com sucesso!");
//         setTimeout(() => {
//           closeModal();
//           onDataUpdate();
//         }, 3000);
//       } catch (error) {
//         console.error("Erro ao atualizar investimento:", error);
//         toast.error("Erro ao atualizar investimento.");
//       }
//     }
//     setIsEditConfirmOpen(false);
//   };

//   return (
//     <Dialog.Root
//       onOpenChange={(isOpen) => {
//         if (!isOpen) {
//           closeModal();
//         }
//       }}
//       open={Boolean(selectedInvestment)}
//     >
//       <Dialog.Trigger asChild>
//         <button id="edit-btn" className="hidden" />
//       </Dialog.Trigger>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 h-screen w-full bg-black opacity-65" />
//         <Dialog.Content
//           onEscapeKeyDown={(e) => e.preventDefault()}
//           onPointerDownOutside={(e) => e.preventDefault()}
//           className="bg-metaverso-white border-metaverso-blue-ligth fixed left-1/2 top-1/2 z-[50] flex h-[40rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-3xl border-4 px-10 py-10 shadow-md"
//         >
//           <Dialog.Title className="mb-5 text-center text-lg font-bold text-black">
//             Editar Investimento
//           </Dialog.Title>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex h-full w-full flex-col justify-around"
//           >
//             <div className="w-full">
//               <label htmlFor="nomeInvestidor" className="font-semibold">
//                 Nome do Investidor
//               </label>
//               <select
//                 className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
//                 {...register("nomeInvestidor")} // Registro do campo no react-hook-form
//                 defaultValue={selectedInvestment?.nomeInvestidor || ""}
//               >
//                 <option value="">Selecione um investidor</option>
//                 {investors.map((investor) => (
//                   <option key={investor.id} value={investor.nome}>
//                     {investor.nome}
//                   </option>
//                 ))}
//               </select>
//               {errors.nomeInvestidor && (
//                 <span className="text-red-500">
//                   {errors.nomeInvestidor.message}
//                 </span>
//               )}
//             </div>
//             <div className="w-full">
//               <label htmlFor="nomeAtivo" className="font-semibold">
//                 Nome do Ativo
//               </label>
//               <select
//                 className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
//                 {...register("nomeAtivo")} // Registro do campo no react-hook-form
//                 defaultValue={selectedInvestment?.nomeAtivo || ""}
//               >
//                 <option value="">Selecione um ativo</option>
//                 {ativos.map((ativo) => (
//                   <option key={ativo.id} value={ativo.nome}>
//                     {ativo.nome}
//                   </option>
//                 ))}
//               </select>
//               {errors.nomeAtivo && (
//                 <span className="text-red-500">{errors.nomeAtivo.message}</span>
//               )}
//             </div>
//             <div className="w-full">
//               <label htmlFor="valor" className="font-semibold">
//                 Valor
//               </label>
//               <CurrencyInput
//                 id="valor"
//                 name="valor"
//                 placeholder="R$ 0,00"
//                 decimalsLimit={2}
//                 decimalSeparator=","
//                 groupSeparator="."
//                 prefix="R$ "
//                 className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
//                 defaultValue={selectedInvestment?.valor.toString() || ""}
//                 onValueChange={(value) => {
//                   setValue(
//                     "valor",
//                     value
//                       ? parseFloat(value.replace(/\./g, "").replace(",", "."))
//                       : 0,
//                   );
//                 }}
//               />
//               {errors.valor && (
//                 <span className="text-red-500">{errors.valor.message}</span>
//               )}
//             </div>
//             <div className="w-full">
//               <label htmlFor="dataInvestimento" className="font-semibold">
//                 Data de Investimento
//               </label>
//               <input
//                 type="date"
//                 className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
//                 {...register("dataInvestimento")}
//                 defaultValue={selectedInvestment?.dataInvestimento || ""}
//               />
//               {errors.dataInvestimento && (
//                 <span className="text-red-500">
//                   {errors.dataInvestimento.message}
//                 </span>
//               )}
//             </div>
//             <div className="w-full">
//               <label htmlFor="rendimento" className="font-semibold">
//                 Rendimento
//               </label>
//               <CurrencyInput
//                 id="rendimento"
//                 name="rendimento"
//                 placeholder="R$ 0,00"
//                 decimalsLimit={2}
//                 decimalSeparator=","
//                 groupSeparator="."
//                 prefix="R$ "
//                 className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
//                 defaultValue={selectedInvestment?.rendimento.toString() || ""}
//                 onValueChange={(value) => {
//                   setValue(
//                     "rendimento",
//                     value
//                       ? parseFloat(value.replace(/\./g, "").replace(",", "."))
//                       : 0,
//                   );
//                 }}
//               />
//               {errors.rendimento && (
//                 <span className="text-red-500">
//                   {errors.rendimento.message}
//                 </span>
//               )}
//             </div>
//             <div className="flex w-full justify-center gap-5">
//               <button
//                 type="submit"
//                 className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 min-w-28 rounded-lg px-6 font-bold transition duration-300"
//               >
//                 Salvar
//               </button>
//               <ToastContainer />

//               <Dialog.Close asChild>
//                 <button
//                   id="dialog-close-btn"
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark h-10 min-w-28 rounded-lg px-6 font-bold transition duration-300"
//                 >
//                   Cancelar
//                 </button>
//               </Dialog.Close>
//             </div>
//           </form>
//         </Dialog.Content>
//       </Dialog.Portal>
//       <Dialog.Root open={isEditConfirmOpen} onOpenChange={setIsEditConfirmOpen}>
//         <Dialog.Overlay className="fixed inset-0 z-[60] bg-black opacity-30" />
//         <Dialog.Content className="fixed left-1/2 top-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-6 shadow-md">
//           <Dialog.Title className="text-lg font-bold">
//             Confirmar Edição
//           </Dialog.Title>
//           <Dialog.Description className="mt-2">
//             Deseja salvar as alterações?
//           </Dialog.Description>
//           <div className="mt-4 flex justify-end space-x-2">
//             <button
//               onClick={() => setIsEditConfirmOpen(false)}
//               className="rounded bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
//             >
//               Cancelar
//             </button>
//             <button
//               onClick={confirmEdit}
//               className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//             >
//               Salvar
//             </button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Root>
//     </Dialog.Root>
//   );
// }

import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateInvestment } from "../../services/investmentService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field"; // Importa a biblioteca de máscara de entrada
import { InvestmentType } from "../../Types/investmentType";
import { getInvestor } from "@/services/investorService";
import { getAtivo } from "@/services/ativoService";

// Definindo configurações de validação do formulário com zod
export const investmentSchema = z.object({
  nomeInvestidor: z.string().nonempty("Nome do investidor é obrigatório"),
  nomeAtivo: z.string().nonempty("Nome do ativo é obrigatório"),
  valor: z
    .number()
    .nonnegative("Valor é obrigatório")
    // .transform((val) => parseFloat(val.replace(/[^\d.-]/g, "")))
    .refine((val) => !isNaN(val), { message: "Valor deve ser um número" }),
  dataInvestimento: z.string().nonempty("Data de investimento é obrigatória"),
  rendimento: z
    .number()
    .nonnegative("Rendimento é obrigatório")
    // .transform((val) => parseFloat(val.replace(/[^\d.-]/g, "")))
    .refine((val) => !isNaN(val), { message: "Rendimento deve ser um número" }),
});

type InvestmentFormInputs = z.infer<typeof investmentSchema>;

interface EditInvestmentFormProps {
  selectedInvestment: InvestmentType | null;
  onDataUpdate: () => void;
  setSelectedInvestment: (investment: InvestmentType | null) => void;
  onClose: () => void;
}

export function EditInvestmentForm({
  onDataUpdate,
  selectedInvestment,
  setSelectedInvestment,
  onClose,
}: EditInvestmentFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<InvestmentFormInputs>({
    resolver: zodResolver(investmentSchema),
  });

  const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<InvestmentFormInputs | null>(null);
  const [investors, setInvestors] = useState<{ id: number; nome: string }[]>(
    [],
  );
  const [ativos, setAtivos] = useState<{ id: number; nome: string }[]>([]);

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

  useEffect(() => {
    if (selectedInvestment) {
      reset(selectedInvestment);
      setValue("nomeInvestidor", selectedInvestment.nomeInvestidor);
      setValue("nomeAtivo", selectedInvestment.nomeAtivo);
      setValue("valor", selectedInvestment.valor);
      setValue("rendimento", selectedInvestment.rendimento);
    }
  }, [selectedInvestment, reset, setValue]);

  const nomeInvestidorValue = watch(
    "nomeInvestidor",
    selectedInvestment?.nomeInvestidor,
  );
  const nomeAtivoValue = watch("nomeAtivo", selectedInvestment?.nomeAtivo);

  const closeModal = () => {
    onClose();
    setFormData(null);
    reset();
  };

  const onSubmit = (data: InvestmentFormInputs) => {
    if (selectedInvestment) {
      setFormData(data);
      setIsEditConfirmOpen(true);
    }
  };

  const confirmEdit = async () => {
    if (selectedInvestment && formData) {
      try {
        const updatedInvestment: InvestmentType = {
          ...selectedInvestment,
          ...formData,
        };
        await updateInvestment(selectedInvestment.id, updatedInvestment);
        toast.success("Investimento atualizado com sucesso!");
        setTimeout(() => {
          closeModal();
          onDataUpdate();
        }, 3000);
      } catch (error) {
        console.error("Erro ao atualizar investimento:", error);
        toast.error("Erro ao atualizar investimento.");
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
      open={Boolean(selectedInvestment)}
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
            Editar Investimento
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-around"
          >
            <div className="w-full">
              <label htmlFor="nomeInvestidor" className="font-semibold">
                Nome do Investidor
              </label>
              <select
                className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                {...register("nomeInvestidor")} // Registro do campo no react-hook-form
                value={nomeInvestidorValue || ""}
                onChange={(e) => setValue("nomeInvestidor", e.target.value)}
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
                Nome do Ativo
              </label>
              <select
                className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                {...register("nomeAtivo")} // Registro do campo no react-hook-form
                // @ts-ignore
                value={nomeAtivoValue || ""}
                onChange={(e) => setValue("nomeAtivo", e.target.value)}
              >
                <option value="">Selecione um ativo</option>
                {ativos.map((ativo) => (
                  <option key={ativo.id} value={ativo.nome}>
                    {ativo.nome}
                  </option>
                ))}
              </select>
              {errors.nomeAtivo && (
                <span className="text-red-500">{errors.nomeAtivo.message}</span>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="valor" className="font-semibold">
                Valor
              </label>
              <CurrencyInput
                id="valor"
                name="valor"
                placeholder="R$ 0,00"
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                prefix="R$ "
                className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                defaultValue={selectedInvestment?.valor.toString() || ""}
                onValueChange={(value) => {
                  setValue(
                    "valor",
                    value
                      ? parseFloat(value.replace(/\./g, "").replace(",", "."))
                      : 0,
                  );
                }}
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
                defaultValue={selectedInvestment?.dataInvestimento || ""}
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
                name="rendimento"
                placeholder="R$ 0,00"
                decimalsLimit={2}
                decimalSeparator=","
                groupSeparator="."
                prefix="R$ "
                className="w-full rounded-md border border-slate-400 p-2 focus:border-blue-500 focus:shadow-md focus:outline-none"
                defaultValue={selectedInvestment?.rendimento.toString() || ""}
                onValueChange={(value) => {
                  setValue(
                    "rendimento",
                    value
                      ? parseFloat(value.replace(/\./g, "").replace(",", "."))
                      : 0,
                  );
                }}
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
