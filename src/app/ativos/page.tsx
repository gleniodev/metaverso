"use client";

import { useEffect, useState } from "react";
import { AtivoType } from "../../Types/ativoType";
import { getAtivo } from "@/services/ativoService";
import React from "react";
import { ProductTable } from "../../componnents/Content/productTable";
import { Column } from "react-table";

const ProductList: React.FC = () => {
  const [product, setProduct] = useState<AtivoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getAtivo();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const productColumns: Column<any>[] = React.useMemo(
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
      <ProductTable data={product} columns={productColumns} />
    </div>
  );
};

export default ProductList;
