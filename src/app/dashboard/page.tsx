// 'use client'

// import React, { useEffect, useState } from 'react';
// import { getInvestor} from '../../services/investorService';
// import { InvestorTable } from '../../componnents/Content/investorTable';
// import { InvestorType } from '../../Types/investorType';

// export const Investidores: React.FC = () => {
//   const [investors, setInvestors] = useState<InvestorType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getInvestor();
//         setInvestors(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching investors:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h1 className="text-2xl mb-4">Investors</h1>
//       <InvestorTable data={investors} />
//     </div>
//   );
// };


export default function Investimentos() {
  return (
    <main className='min-h-screen bg-white shadow-xl rounded-3xl px-5 py-8'>
            {/* <Investidores /> */}
            <h1>Dashboard</h1>
        </main>
  )
}

