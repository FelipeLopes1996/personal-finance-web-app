import { api } from "@/api/axios";
import { Button } from "@/components/Button";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import { Example } from "@/components/ExpenseTable";
import { Skeleton } from "@/components/Skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Expense } from "@/types/IExpense";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { value: userId } = useLocalStorage<string | null>(
    "@finance:userId",
    null
  );
  // const { data, isLoading, error } = useQuery({
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    },
    retry: 3,
  });

  const { data: dataExpense, isLoading: dataExpenseIsLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async (): Promise<Expense[]> => {
      const response = await api.get(`/expenses`);
      return response.data;
    },
    retry: 3,
  });

  return (
    <div className="flex flex-col h-full">
      {isLoading && dataExpenseIsLoading ? (
        <>
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[20rem] w-full mt-[2rem]" />
        </>
      ) : (
        <>
          <DashboardCard userName={data?.name} userSalary={data?.salary} />
          {dataExpense?.length ? (
            <Example />
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-2.5 rounded-[4px] mt-[4rem]">
              <h2 className="text-[0.9rem] md:text-[1.2rem] font-semibold">
                Você ainda não possui gastos
              </h2>
              <div>
                <Button className="flex gap-1.5 items-center p-[0.8rem] text-[0.8rem] md:text-[1rem]">
                  {" "}
                  <Plus size={20} />
                  Adicionar
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
