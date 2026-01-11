import { api } from "@/api/axios";
import { Button } from "@/components/Button";
import CustomToast from "@/components/CustomToast";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import Modal from "@/components/Modal";
import { Skeleton } from "@/components/Skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Expense, ICreateExpense } from "@/types/IExpense";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const { value: userId } = useLocalStorage<string | null>(
    "@finance:userId",
    null
  );
  const queryClient = useQueryClient();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenCreateOrEditModal, setIsOpenCreateOrEditModal] =
    useState<boolean>(false);

  const [expenseId, setExpenseId] = useState<number>(0);
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    },
  });

  const { data: dataExpense, isLoading: dataExpenseIsLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async (): Promise<Expense[]> => {
      const response = await api.get(`/expenses`);
      return response.data;
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      await api.delete(`/expenses/${expenseId}`);
    },
    onSuccess: () => {
      // Atualiza a lista após deletar
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
      CustomToast({
        title: "Gasto excluído com sucesso!",
        status: "success",
      });
      setExpenseId(0);
      setIsOpenDeleteModal(false);
    },
    onError: (response) => {
      console.log(response);
    },
  });

  const createExpenseMutation = useMutation({
    mutationFn: async (payload: ICreateExpense): Promise<void> => {
      await api.post(`/expenses`, payload);
    },
    onSuccess: () => {
      // Atualiza a lista após deletar
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
      CustomToast({
        title: "Gasto adicionado com sucesso!",
        status: "success",
      });
      setIsOpenCreateOrEditModal(false);
    },
    onError: (response) => {
      console.log(response);
    },
  });

  const handleOrEditCreate = () => {
    setIsOpenCreateOrEditModal(true);
  };

  const handleEdit = (id: number) => console.log("Editar", id);

  const handleDelete = (id: number) => {
    setIsOpenDeleteModal(true);
    setExpenseId(id);
    console.log("Deletar", id);
  };

  console.log("dataExpense", dataExpense);

  return (
    <div className="flex flex-col ">
      {isLoading || dataExpenseIsLoading ? (
        <>
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[20rem] w-full mt-[2rem]" />
        </>
      ) : (
        <>
          <DashboardCard userName={data?.name} userSalary={data?.salary} />
          {dataExpense?.length ? (
            <div className="w-full mt-[2rem] bg-white rounded-[4px] overflow-hidden md:shadow-md">
              <div className="flex items-center justify-between bg-white pb-6 md:p-6 shadow-none md:shadow-md ">
                <h2 className="text-[1.2rem] md:text-[1.5rem]">
                  Gastos atuais
                </h2>
                <div>
                  <Button
                    className="flex gap-1.5 items-center p-[0.8rem]"
                    onClick={handleOrEditCreate}
                  >
                    {" "}
                    <Plus size={20} />
                    Adicionar
                  </Button>
                </div>
              </div>
              <ExpenseTable
                data={dataExpense || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
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
      <Modal
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        title="Excluir Gasto"
        confirmText="Excluir"
        onConfirm={() => deleteExpenseMutation.mutate()}
        isLoading={deleteExpenseMutation.isPending}
      >
        <p>Deseja realmente excluir este gasto?</p>
      </Modal>
      <Modal
        isOpen={isOpenCreateOrEditModal}
        onClose={() => setIsOpenCreateOrEditModal(false)}
        title="Adicionar Gasto"
        confirmText="Criar"
        onConfirm={() => deleteExpenseMutation.mutate()}
        isLoading={deleteExpenseMutation.isPending}
      >
        <ExpenseForm
          isLoading={createExpenseMutation.isPending || false}
          sendCreateOrEditExpense={createExpenseMutation.mutate}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
