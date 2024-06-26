'use client'

import { useEffect, useState } from 'react';
import { InvestmentType } from '../../Types/investmentType';
import { getInvestment } from '@/services/investmentService';
import React from 'react';
import { InvestmentTable } from '../../componnents/Content/investmentTable';
import { Column } from 'react-table';

const InvestmentList: React.FC = () => {
  const [investment, setInvestment] = useState<InvestmentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        const data = await getInvestment();
        setInvestment(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching investment:', error);
        setLoading(false);
      }
    };
    fetchInvestment();

  }, []);

  const investmentColumns: Column<any>[] = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Investidor', accessor: 'investidorId' },
      { Header: 'Ativo', accessor: 'tipoInvestimento' },
      { Header: 'Valor', accessor: 'valor' },
      { Header: 'Data', accessor: 'dataInvestimento' },
      { Header: 'Rendimento', accessor: 'rendimento' },
      { Header: 'Ações'}
    ],
    []
  );  

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-8">Investimentos</h1>
      <InvestmentTable data={investment} columns={investmentColumns}/>
    </div>
  );
};

export default InvestmentList;

