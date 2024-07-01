"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Column } from "react-table";
import { format } from "date-fns";
import { InvestorType } from "../../Types/investorType";
import { getInvestor } from "@/services/investorService";
import { InvestorTable } from "@/componnents/Content/investorTable";
import { EditButton } from "@/componnents/Ui/editButton";
import { DeleteButton } from "@/componnents/Ui/deleteButton";
import { InvestorForm } from "@/componnents/Content/investorForm";

// Estado para armazenar a lista de investidores e controlar o carregamento
const InvestorList: React.FC = () => {
  const [investors, setInvestors] = useState<InvestorType[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect para buscar os dados dos investidores na montagem do componente

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

  useEffect(() => {
    fetchInvestors();
  }, []);

  const handleDataUpdate = () => {
    fetchInvestors(); // Atualiza os dados da tabela
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
        // Cell: ({ row }) => (
        //   <>
        //       <EditButton onClick={() => handleEdit(row.original.id)} />
        //       <DeleteButton onClick={() => handleDelete(row.original.id)} />
        //   </>
      },
    ],
    [],
  );
  // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <div>Carregando...</div>;
  }
  // Retorna o formulário para adicionar novos investidores e tabela para exibi a lista de investidores
  return (
    <div>
      <InvestorForm onDataUpdate={handleDataUpdate} />
      <InvestorTable data={investors} columns={investorColumns} />
    </div>
  );
};

export default InvestorList;
