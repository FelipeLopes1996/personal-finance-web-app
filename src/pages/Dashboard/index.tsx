import { api } from "@/api/axios";
import { Button } from "@/components/Button";
import CustomToast from "@/components/CustomToast";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import Modal from "@/components/Modal";
import NoDataContent from "@/components/NoDataContent";
import { Skeleton } from "@/components/Skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { ICreateOrEditExpense, IExpense } from "@/types/IExpense";
import { formatCurrency } from "@/utils/formatCurrency";
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
  const [editExpenseValues, setEditExpenseValues] = useState<IExpense | null>(
    null
  );

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
    queryFn: async (): Promise<IExpense[]> => {
      const response = await api.get(`/expenses`);
      return response.data;
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      await api.delete(`/expenses/${expenseId}`);
    },
    onSuccess: () => {
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
    mutationFn: async (payload: ICreateOrEditExpense): Promise<void> => {
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

  const editExpenseMutation = useMutation({
    mutationFn: async (payload: ICreateOrEditExpense): Promise<void> => {
      await api.put(`/expenses/${editExpenseValues?.id}`, payload);
    },
    onSuccess: () => {
      // Atualiza a lista após deletar
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
      CustomToast({
        title: "Gasto salvo com sucesso!",
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

  const handleEdit = (edit: IExpense) => {
    setEditExpenseValues(edit);
    setIsOpenCreateOrEditModal(true);
  };

  const handleDelete = (id: number) => {
    setIsOpenDeleteModal(true);
    setExpenseId(id);
  };

  const handleCloseCreateOrEdit = () => {
    setEditExpenseValues(null);
    setIsOpenCreateOrEditModal(false);
  };

  return (
    <div className="flex flex-col ">
      {isLoading || dataExpenseIsLoading ? (
        <>
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[20rem] w-full mt-[2rem]" />
        </>
      ) : (
        <>
          <h1 className="text-[2rem] mb-[2rem]">Dashboard</h1>
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
            <NoDataContent
              handleAction={handleOrEditCreate}
              title="Você ainda não possui gastos"
            />
          )}
        </>
      )}
      <Modal
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        title="Excluir gasto"
        confirmText="Excluir"
        onConfirm={() => deleteExpenseMutation.mutate()}
        isLoading={deleteExpenseMutation.isPending}
      >
        <p>Deseja realmente excluir este gasto?</p>
      </Modal>
      <Modal
        isOpen={isOpenCreateOrEditModal}
        isForm={true}
        onClose={handleCloseCreateOrEdit}
        title={editExpenseValues ? "Editar Gasto" : "Adicionar Gasto"}
        onConfirm={() => deleteExpenseMutation.mutate()}
        isLoading={deleteExpenseMutation.isPending}
      >
        <ExpenseForm
          isLoading={
            createExpenseMutation.isPending ||
            editExpenseMutation.isPending ||
            false
          }
          sendCreateOrEditExpense={
            editExpenseValues
              ? editExpenseMutation.mutate
              : createExpenseMutation.mutate
          }
          defaultValues={
            editExpenseValues
              ? {
                  name: editExpenseValues?.name,
                  description: editExpenseValues?.description ?? "",
                  value: formatCurrency(
                    String(editExpenseValues?.value || 0),
                    false
                  ),
                }
              : undefined
          }
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
