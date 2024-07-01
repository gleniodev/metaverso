"use client";

import React, { useState, useEffect } from "react";
import { getInvestor } from "@/services/investorService";
import { getInvestment } from "@/services/investmentService";
import { InvestorType } from "@/Types/investorType";
import { InvestmentType } from "@/Types/investmentType";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard: React.FC = () => {
  const [investors, setInvestors] = useState<InvestorType[]>([]);
  const [investments, setInvestments] = useState<InvestmentType[]>([]);
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [totalPortfolio, setTotalPortfolio] = useState<number>(0);

  useEffect(() => {
    const fetchInvestors = async () => {
      const data = await getInvestor();
      setInvestors(data);
    };

    const fetchInvestments = async () => {
      const data = await getInvestment();
      setInvestments(data);
    };

    fetchInvestors();
    fetchInvestments();
  }, []);

  const [selectedInvestor, setSelectedInvestor] = useState(() => {
    return investments.length > 0 ? investments[0].investidorId.toString() : "";
  });

  useEffect(() => {
    if (!selectedInvestor && investments.length > 0) {
      setSelectedInvestor(investments[0].investidorId.toString());
    }

    if (selectedInvestor) {
      const investorInvestments = investments.filter(
        (inv) => inv.investidorId.toString() === selectedInvestor,
      );

      const invested = investorInvestments.reduce(
        (acc, curr) => acc + curr.valor,
        0,
      );
      const earnings = investorInvestments.reduce(
        (acc, curr) => acc + curr.rendimento,
        0,
      );

      setTotalInvested(invested);
      setTotalEarnings(earnings);
      setTotalPortfolio(invested + earnings);
    } else {
      setTotalInvested(0);
      setTotalEarnings(0);
      setTotalPortfolio(0);
    }
  }, [selectedInvestor, investments]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const data = [
    { name: "Valor Aportado", value: totalInvested },
    { name: "Rendimentos", value: totalEarnings },
    { name: "Total Carteira", value: totalPortfolio },
  ];

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cliente</h1>
        <select
          className="rounded border p-2"
          value={selectedInvestor}
          onChange={(e) => setSelectedInvestor(e.target.value)}
        >
          <option value="">Selecione um cliente</option>
          {investors.map((investor) => (
            <option key={investor.id} value={investor.id}>
              {investor.nome}
            </option>
          ))}
        </select>
      </header>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold">Valor Capital Aportado</h2>
          <p className="text-2xl">
            {totalInvested.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <div className="rounded-l bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold">Valor Total de Rendimentos</h2>
          <p className="text-2xl">
            {totalEarnings.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <div className="rounded bg-white p-4 shadow-md">
          <h2 className="text-xl font-bold">Valor Total da Carteira</h2>
          <p className="text-2xl">
            {totalPortfolio.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded bg-white p-4 shadow">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={[
                { name: "Valor Aportado", Valores: totalInvested },
                { name: "Rendimentos", Valores: totalEarnings },
                { name: "Total Carteira", Valores: totalPortfolio },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Valores" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
