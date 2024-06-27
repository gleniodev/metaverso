"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Column } from "react-table";
import { format } from "date-fns";
import { InvestorType } from "../../Types/investorType";
import { getInvestor } from "@/services/investorService";
import { InvestorTable } from "@/componnents/Content/investorTable";
import { AddButton } from "@/componnents/Ui/addButton";
import { EditButton } from "@/componnents/Ui/editButton";
import { DeleteButton } from "@/componnents/Ui/deleteButton";
import { InvestorForm } from "@/componnents/Content/investorForm";

const InvestorList: React.FC = () => {
  const [investors, setInvestors] = useState<InvestorType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchInvestors();
  }, []);

  const investorColumns: Column<any>[] = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Nome", accessor: "nome" },
      { Header: "E-mail", accessor: "email" },
      {
        Header: "CPF",
        accessor: "cpf",
        Cell: ({ value }) => {
          return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        },
      },
      {
        Header: "Nascimento",
        accessor: "dataNascimento",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yyyy");
        },
      },
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

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <InvestorForm />
      <InvestorTable data={investors} columns={investorColumns} />
    </div>
  );
};

export default InvestorList;
