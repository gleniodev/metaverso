'use client'

import { useEffect, useState } from 'react';
import { ProductType } from '../../Types/produtcType';
import { getProduct } from '@/services/productService';
import React from 'react';
import { ProductTable } from '../../componnents/Content/productTable';
import { Column } from 'react-table';

const ProductList: React.FC = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProduct();

  }, []);

  const productColumns: Column<any>[] = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Nome', accessor: 'nome' },
      { Header: 'Ações'},
      
    ],
    []
  );  

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Produtos</h1>
      <ProductTable data={product} columns={productColumns}/>
    </div>
  );
};

export default ProductList;

