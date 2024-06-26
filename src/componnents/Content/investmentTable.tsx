import { useTable, Column, useGlobalFilter } from 'react-table';
import { InvestmentType } from '../../Types/investmentType';

interface InvestmentTableProps {
  data: InvestmentType[];
  columns: Column[];
}

export function InvestmentTable({ data, columns }: InvestmentTableProps) {
  const { getTableProps, getTableBodyProps, state, setGlobalFilter, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  }, useGlobalFilter);

  return (
    <div>
      <input
        value={(state as any).globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Buscar..."
        className="p-2 rounded-xl w-full mb-4 bg-metaverso-blue-ligth"
      />    
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
