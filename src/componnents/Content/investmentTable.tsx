import { useTable, Column, useGlobalFilter, useSortBy } from "react-table";
import { InvestmentType } from "../../Types/investmentType";

interface InvestmentTableProps {
  data: InvestmentType[];
  columns: Column[];
}

export function InvestmentTable({ data, columns }: InvestmentTableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    state,
    // @ts-ignore
    setGlobalFilter,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
  );

  return (
    <div>
      <input
        value={(state as any).globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Buscar..."
        className="mb-8 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  {column.render("Header")}
                  <span className="text-metaverso-blue-dark">
                    {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                  </span>
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
                    {cell.render("Cell")}
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
