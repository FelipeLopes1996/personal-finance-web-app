import { Pencil, Trash } from "lucide-react";
import type { IExpense } from "@/types/IExpense";
import type { IPageResponse } from "@/types/IPageResponse";
import SpinnerLoading from "../SpinnerLoading";
import { formatters } from "@/utils/formatters";
import { PaginationTable } from "../PaginationTable";

interface ITableProps {
  data: IPageResponse<IExpense> | undefined;
  page: number;
  loading: boolean;
  onEdit: (edit: IExpense) => void;
  onDelete: (id: number) => void;
  onPageChange: (page: number) => void;
}

const HEADE_NAMES = [
  "Nome",
  "Descrição",
  "Categoria",
  "Valor",
  "Data",
  "Ações",
];

const ExpenseTable = ({
  data,
  page,
  loading = false,
  onEdit,
  onDelete,
  onPageChange,
}: ITableProps) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <table className="w-full table-auto text-left bg-white  shadow-[6px_0_10px_-6px_rgba(0,0,0,0.15),_-6px_0_10px_-6px_rgba(0,0,0,0.15)]">
          <thead>
            <tr>
              {HEADE_NAMES.map((name) => (
                <th
                  key={name}
                  scope="col"
                  className="border-b border-gray-200 bg-blue-gray-50 p-4 font-[600] text-[1rem] text-black"
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!loading && data?.content?.length
              ? data?.content.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-2">{item.description || "-"}</td>
                    <td className="px-4 py-2">{item.cateroryName || "-"}</td>
                    <td className="px-4 py-2">
                      {item.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {item.date ? formatters.formatDateBR(item.date) : "-"}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() =>
                          onEdit({
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            value: item.value,
                            categoryId: item.categoryId,
                            date: item.date,
                          })
                        }
                        className="px-2 py-1  text-white rounded hover:bg-blue-100 transition cursor-pointer"
                      >
                        <Pencil size={20} className="text-blue-500" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="px-2 py-1  text-white rounded hover:bg-red-100 transition cursor-pointer"
                      >
                        <Trash size={20} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              : null}
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center">
                  <SpinnerLoading width="10" height="6" />
                </td>
              </tr>
            )}
            {!loading && !data?.content?.length && (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center">
                  Nehum resultado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PaginationTable
          data={data}
          page={page}
          loading={loading}
          onPageChange={(newPage) => onPageChange(newPage)}
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4 mb-[2rem]">
        {loading && (
          <div className="flex justify-center">
            <SpinnerLoading width="10" height="6" />
          </div>
        )}
        {!loading &&
          data?.content?.length &&
          data?.content.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded p-4 shadow-sm bg-white"
            >
              <p>
                <span className="font-semibold">Nome:</span> {item.name}
              </p>
              {item.description ? (
                <p>
                  <span className="font-semibold">Descrição:</span>{" "}
                  {item.description || "-"}
                </p>
              ) : null}
              {item.cateroryName ? (
                <p>
                  <span className="font-semibold">Descrição:</span>{" "}
                  {item.cateroryName || "-"}
                </p>
              ) : null}
              <p>
                <span className="font-semibold">Valor:</span>{" "}
                {item.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              {item.date ? (
                <p>
                  <span className="font-semibold">Valor:</span>{" "}
                  {formatters.formatDateBR(item.date)}
                </p>
              ) : null}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() =>
                    onEdit({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      value: item.value,
                      categoryId: item.categoryId,
                      date: item.date,
                    })
                  }
                  className="flex-1 px-2 py-1 flex justify-center items-center rounded hover:bg-blue-100 transition cursor-pointer"
                >
                  <Pencil size={20} className="text-blue-500" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="flex-1 px-2 py-1 flex justify-center items-center rounded hover:bg-red-100 transition cursor-pointer"
                >
                  <Trash size={20} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        <PaginationTable
          data={data}
          page={page}
          loading={loading}
          onPageChange={(newPage) => onPageChange(newPage)}
        />
      </div>
    </>
  );
};

export default ExpenseTable;
