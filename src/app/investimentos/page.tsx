"use client";

import { useEffect, useState } from "react";
import { InvestmentType } from "../../Types/investmentType";
import { getInvestment } from "@/services/investmentService";
import React from "react";
import { InvestmentTable } from "../../componnents/Content/investmentTable";
import { Column } from "react-table";
import { InvestmentForm } from "@/componnents/Content/investmentForm";

const InvestmentList: React.FC = () => {
  const [investment, setInvestment] = useState<InvestmentType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvestment = async () => {
    try {
      const data = await getInvestment();
      setInvestment(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching investment:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestment();
  }, []);

  const handleDataUpdate = () => {
    fetchInvestment(); // Atualiza os dados da tabela
  };

  const investmentColumns: Column<any>[] = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Investidor", accessor: "nomeInvestidor" },
      { Header: "Ativo", accessor: "nomeativo" },
      {
        Header: "Valor",
        accessor: "valor",
        //Formatação do valor em moeda
        Cell: ({ value }) => {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value);
        },
      },
      { Header: "Data", accessor: "dataInvestimento" },
      {
        Header: "Rendimento",
        accessor: "rendimento",
        //Formatação do valor em moeda
        Cell: ({ value }) => {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(value);
        },
      },
      { Header: "Ações" },
    ],
    [],
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <InvestmentForm onDataUpdate={handleDataUpdate} />
      <InvestmentTable data={investment} columns={investmentColumns} />
    </div>
  );
};

export default InvestmentList;
