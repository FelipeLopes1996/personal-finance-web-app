import { formatCurrency } from "@/utils/formatCurrency";

type CardType = {
  userName?: string;
  userSalary?: number;
  userExpenses?: number;
};

export function DashboardCard({
  userName,
  userSalary,
}: // userExpenses,
CardType) {
  return (
    <div className="w-full rounded-[4px] bg-white p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            Olá, {userName || "-"}
          </p>
        </div>

        {/* <div className="rounded-full bg-gray-100 p-2">📊</div> */}
      </div>

      {/* Valores */}
      <div className="flex justify-between gap-6">
        {/* Receita */}
        <div>
          <p className="text-sm text-gray-500">Salário mensal</p>
          <p className="text-lg font-bold text-green-600">
            {formatCurrency(String(userSalary || 0), false)}
          </p>
        </div>

        {/* Despesa */}
        {/* <div>
          <p className="text-sm text-gray-500">despesa mensal</p>
          <p className="text-lg font-bold text-red-600">
            {" "}
            {userExpenses || "0"}
          </p>
        </div> */}
      </div>
    </div>
  );
}
