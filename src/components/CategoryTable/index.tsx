import type { ICategory } from "@/types/ICategory";
import { Pencil, Trash } from "lucide-react";

interface ITableProps {
  data: ICategory[];
  onEdit: (edit: ICategory) => void;
  onDelete: (id: number) => void;
}

const HEADE_NAMES = ["Nome", "Ações"];

const CategoryTable = ({ data, onEdit, onDelete }: ITableProps) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <table className="w-full min-w-max table-auto text-left bg-white  shadow-md">
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
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
                <td className="px-4 py-2 w-[20%]">
                  <button
                    onClick={() =>
                      onEdit({
                        id: item.id,
                        name: item.name,
                      })
                    }
                    className="px-2 py-1 mr-[0.5rem] text-white rounded hover:bg-blue-100 transition cursor-pointer"
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4 mb-[2rem]">
        {data.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded p-4 shadow-sm bg-white"
          >
            <p>
              <span className="font-semibold">Nome:</span> {item.name}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  onEdit({
                    id: item.id,
                    name: item.name,
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
      </div>
    </>
  );
};

export default CategoryTable;
