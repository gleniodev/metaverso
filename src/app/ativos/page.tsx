"use client";

import { useEffect, useState } from "react";
import { AtivoType } from "../../Types/ativoType";
import { getAtivo } from "@/services/ativoService";
import React from "react";
import { AtivoTable } from "../../componnents/Content/ativoTable";
import { Column } from "react-table";

const AtivoList: React.FC = () => {
  const [ativo, setAtivo] = useState<AtivoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtivo = async () => {
      try {
        const data = await getAtivo();
        setAtivo(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar ativos", error);
        setLoading(false);
      }
    };
    fetchAtivo();
  }, []);

  const ativoColumns: Column<any>[] = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Nome", accessor: "nome" },
      { Header: "Ações" },
    ],
    [],
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">ativos</h1>
      <AtivoTable data={ativo} columns={ativoColumns} />
    </div>
  );
};

export default AtivoList;
