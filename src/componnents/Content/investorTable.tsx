import {
  useTable,
  Column,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { InvestorType } from "../../Types/investorType";
import "@/app/globals.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface InvestorTableProps {
  data: InvestorType[];
  columns: Column[];
  onEdit: (investor: InvestorType) => void; // Adicionado onEdit para editar investidor
  onDelete: (investor: InvestorType) => void; // Adicionado onDelete para deletar investidor
}

export function InvestorTable({
  data,
  columns,
  onEdit,
  onDelete,
}: InvestorTableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    state,
    // @ts-ignore
    setGlobalFilter,
    headerGroups,
    // @ts-ignore
    page,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    pageOptions,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  // @ts-ignore
  const { pageIndex } = state;

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
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className="border-b border-zinc-200"
              >
                {row.cells.map((cell: any) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="m-8 flex items-center justify-center gap-5 p-2">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark flex h-10 w-10 items-center justify-center rounded-full font-bold transition duration-300 disabled:bg-slate-400"
        >
          <ArrowLeft />
        </button>

        <span>
          Página <strong>{pageIndex + 1}</strong> de{" "}
          <strong>{pageOptions.length}</strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-metaverso-blue-ligth text-metaverso-white hover:bg-metaverso-blue-dark flex h-10 w-10 items-center justify-center rounded-full font-bold transition duration-300 disabled:bg-slate-400"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
