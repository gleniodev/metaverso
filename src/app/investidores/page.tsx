"use client";

import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { format } from "date-fns";
import { InvestorType } from "../../Types/investorType";
import { deleteInvestor, getInvestor } from "@/services/investorService";
import { InvestorTable } from "@/componnents/Content/investorTable";
import { AddInvestorForm } from "@/componnents/Content/AddInvestorForm";
import { EditInvestorForm } from "@/componnents/Content/EditInvestorForm";
import * as Dialog from "@radix-ui/react-dialog";

const InvestorPage: React.FC = () => {
  const [investors, setInvestors] = useState<InvestorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorType | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [investorToDelete, setInvestorToDelete] = useState<InvestorType | null>(
    null,
  );

  // Função para buscar os dados dos investidores na montagem do componente
  const fetchInvestors = async () => {
    try {
      const data = await getInvestor();
      setInvestors(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investors:", error);
      setLoading(false);
    }
  };

  // useEffect para buscar os dados na montagem do componente
  useEffect(() => {
    fetchInvestors();
  }, []);

  // Função de callback para atualizar os dados da tabela
  const handleDataUpdate = () => {
    fetchInvestors();
  };

  // Função para iniciar a edição de um investidor
  const handleEdit = (investor: InvestorType) => {
    setSelectedInvestor(investor);
  };

  // Função para iniciar a exclusão de um investidor
  const handleDelete = (investor: InvestorType) => {
    setInvestorToDelete(investor);
    setIsDeleteDialogOpen(true);
  };

  // Função para confirmar a exclusão de um investidor
  const confirmDelete = async () => {
    if (investorToDelete) {
      try {
        await deleteInvestor(investorToDelete.id);
        handleDataUpdate(); // Atualiza os dados da tabela após a exclusão
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error("Erro ao deletar investidor:", error);
      }
    }
  };

  // Função para resetar o formulário ao fechar o modal
  const handleCloseForm = () => {
    setSelectedInvestor(null);
  };

  // Definição das colunas da tabela de investidores
  const investorColumns: Column<any>[] = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Nome", accessor: "nome" },
      { Header: "E-mail", accessor: "email" },
      {
        Header: "CPF",
        accessor: "cpf",
        // Formatação do CPF no formato XXX.XXX.XXX-XX
        Cell: ({ value }) => {
          return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        },
      },
      {
        Header: "Nascimento",
        accessor: "dataNascimento",
        // Formatação da data de nascimento no formato dd/MM/yyyy
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
      // Coluna para botões de ação (editar e deletar)
      {
        Header: "Ações",
        Cell: ({ row }) => (
          <div className="flex">
            <button
              onClick={() => handleEdit(row.original)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="ml-4 text-red-600 hover:text-red-900"
            >
              Deletar
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <AddInvestorForm onDataUpdate={handleDataUpdate} />
      {selectedInvestor && (
        <EditInvestorForm
          onDataUpdate={handleDataUpdate}
          selectedInvestor={selectedInvestor}
          setSelectedInvestor={setSelectedInvestor}
          onClose={handleCloseForm}
        />
      )}
      <InvestorTable
        data={investors}
        columns={investorColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Dialog.Root
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-6 shadow-md">
          <Dialog.Title className="text-lg font-bold">
            Confirmar Exclusão
          </Dialog.Title>
          <Dialog.Description className="mt-2">
            Tem certeza que deseja excluir este investidor?
          </Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="rounded bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Excluir
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default InvestorPage;
