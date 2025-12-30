import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../Button";

interface Item {
  id: number;
  categoria: string;
  descricao: string;
  valor: number;
}

interface ITableProps {
  data: Item[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const HEADE_NAMES = ["Nome", "Descrição", "Valor", "Ações"];

const ExpenseTable = ({ data, onEdit, onDelete }: ITableProps) => {
  return (
    <div className="w-full mt-[2rem] rounded-[4px] bg-white p-[2px] shadow-md">
      <div className="flex items-center justify-between bg-white pb-6 md:p-6 shadow-none md:shadow-md ">
        <h2 className="text-[1rem] md:text-[1.5rem]">Gastos atuais</h2>
        <div>
          <Button className="flex gap-1.5 items-center p-[0.8rem]">
            {" "}
            <Plus size={20} />
            Adicionar
          </Button>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <table className="w-full min-w-max table-auto text-left rounded-[4px] bg-white p-6 shadow-md">
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
                <td className="px-4 py-2 whitespace-nowrap">
                  {item.categoria}
                </td>
                <td className="px-4 py-2">{item.descricao}</td>
                <td className="px-4 py-2">
                  {item.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(item.id)}
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
              <span className="font-semibold">Categoria:</span> {item.categoria}
            </p>
            <p>
              <span className="font-semibold">Descrição:</span> {item.descricao}
            </p>
            <p>
              <span className="font-semibold">Valor:</span>{" "}
              {item.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onEdit(item.id)}
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
    </div>
  );
};

// Exemplo de uso
const Example = () => {
  const data: Item[] = [
    { id: 1, categoria: "Alimentação", descricao: "Mercado", valor: 250 },
    { id: 2, categoria: "Transporte", descricao: "Combustível", valor: 150 },
    { id: 3, categoria: "Lazer", descricao: "Cinema", valor: 50 },
  ];

  const handleEdit = (id: number) => console.log("Editar", id);
  const handleDelete = (id: number) => console.log("Deletar", id);

  return (
    <ExpenseTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
  );
};

export { Example, ExpenseTable };
