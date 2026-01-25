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
import type { ICategory } from "@/types/ICategory";
import type { ICreateOrEditExpense, IExpense } from "@/types/IExpense";
import type { IPageResponse } from "@/types/IPageResponse";
import { PER_PAGE } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const sizeExpense = PER_PAGE;
const sizeCategory = 100;

const Expense = () => {
  const { value: userId } = useLocalStorage<string | null>(
    "@finance:userId",
    null,
  );
  const queryClient = useQueryClient();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenCreateOrEditModal, setIsOpenCreateOrEditModal] =
    useState<boolean>(false);
  const [editExpenseValues, setEditExpenseValues] = useState<IExpense | null>(
    null,
  );
  const [expenseId, setExpenseId] = useState<number>(0);
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    },
  });

  const {
    data: dataExpense = undefined,
    isLoading: dataExpenseIsLoading,
    isFetching: dataExpenseIsFetching,
    refetch,
  } = useQuery({
    queryKey: ["expenses", page, sizeExpense],
    queryFn: async () => {
      const response = await api.get<IPageResponse<IExpense>>(`/expenses`, {
        params: {
          page,
          size: sizeExpense,
        },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    refetch();
  }, []);

  const { data: dataCategories, isLoading: IsLoadingCategories } = useQuery({
    queryKey: ["categories", page, sizeCategory],
    queryFn: async (): Promise<ICategory[]> => {
      const response = await api.get<IPageResponse<ICategory>>(`/categories`, {
        params: {
          page,
          size: sizeCategory,
        },
      });
      return response.data.content;
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
      {IsLoadingCategories || isLoading || dataExpenseIsLoading ? (
        <>
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[20rem] w-full mt-[2rem]" />
        </>
      ) : (
        <>
          <h1 className="text-[2rem] mb-[2rem]">Gastos</h1>
          <DashboardCard userName={data?.name} userSalary={data?.salary} />

          {!dataExpense?.content?.length ? null : (
            <div className="w-full mt-[2rem] bg-white rounded-[4px] overflow-hidden md:shadow-md">
              <div className="flex items-center justify-between bg-white pb-6 md:p-6 shadow-none md:shadow-md ">
                <h2 className="text-[1.2rem] md:text-[1.5rem]">
                  Lista de gastos
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
                data={dataExpense}
                page={page}
                loading={dataExpenseIsFetching}
                onPageChange={setPage}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </>
      )}
      <>
        {!dataExpense?.content?.length && !isLoading ? (
          <NoDataContent
            handleAction={handleOrEditCreate}
            title="Você ainda não possui gastos"
          />
        ) : null}
      </>

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
        onConfirm={() => {}}
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
                  value: formatCurrency(String(editExpenseValues?.value || 0)),
                  categoryId: editExpenseValues?.categoryId ?? 0,
                  localDate: editExpenseValues?.date,
                }
              : undefined
          }
          categories={dataCategories || []}
        />
      </Modal>
    </div>
  );
};

export default Expense;
