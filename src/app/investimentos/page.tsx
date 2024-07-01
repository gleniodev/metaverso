"use client";

import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { format } from "date-fns";
import { InvestmentType } from "../../Types/investmentType";
import { deleteInvestment, getInvestment } from "@/services/investmentService";
import { InvestmentTable } from "@/componnents/Content/investmentTable";
import { AddInvestmentForm } from "@/componnents/Content/AddInvestmentForm";
import { EditInvestmentForm } from "@/componnents/Content/EditInvestmentForm";
import * as Dialog from "@radix-ui/react-dialog";

const InvestmentPage: React.FC = () => {
  const [investments, setInvestments] = useState<InvestmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvestment, setSelectedInvestment] =
    useState<InvestmentType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [investmentToDelete, setInvestmentToDelete] =
    useState<InvestmentType | null>(null);

  // Função para buscar os dados dos investimentos na montagem do componente
  const fetchInvestments = async () => {
    try {
      const data = await getInvestment();
      setInvestments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investments:", error);
      setLoading(false);
    }
  };

  // useEffect para buscar os dados na montagem do componente
  useEffect(() => {
    fetchInvestments();
  }, []);

  // Função de callback para atualizar os dados da tabela
  const handleDataUpdate = () => {
    fetchInvestments();
  };

  // Função para iniciar a edição de um investimento
  const handleEdit = (investment: InvestmentType) => {
    setSelectedInvestment(investment);
  };

  // Função para iniciar a exclusão de um investimento
  const handleDelete = (investment: InvestmentType) => {
    setInvestmentToDelete(investment);
    setIsDeleteDialogOpen(true);
  };

  // Função para confirmar a exclusão de um investimento
  const confirmDelete = async () => {
    if (investmentToDelete) {
      try {
        await deleteInvestment(investmentToDelete.id);
        handleDataUpdate(); // Atualiza os dados da tabela após a exclusão
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error("Erro ao deletar investimento:", error);
      }
    }
  };

  // Função para resetar o formulário ao fechar o modal de edição
  const handleCloseForm = () => {
    setSelectedInvestment(null);
  };

  // Definição das colunas da tabela de investimentos
  const investmentColumns: Column<any>[] = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Investidor", accessor: "nomeInvestidor" },
      { Header: "Ativo", accessor: "nomeAtivo" },
      {
        Header: "Valor",
        accessor: "valor",
        // Formatação do valor em moeda
        Cell: ({ value }) => {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value);
        },
      },
      {
        Header: "Data",
        accessor: "dataInvestimento",
        // Formatação da data de investimento no formato dd/MM/yyyy
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
      {
        Header: "Rendimento",
        accessor: "rendimento",
        // Formatação do valor em moeda
        Cell: ({ value }) => {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value);
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
      <AddInvestmentForm onDataUpdate={handleDataUpdate} />
      {selectedInvestment && (
        <EditInvestmentForm
          onDataUpdate={handleDataUpdate}
          selectedInvestment={selectedInvestment}
          setSelectedInvestment={setSelectedInvestment}
          onClose={handleCloseForm}
        />
      )}
      <InvestmentTable
        data={investments}
        columns={investmentColumns}
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
            Tem certeza que deseja excluir este investimento?
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

export default InvestmentPage;
