import { api } from "@/api/axios";
import CategoryTable from "@/components/CategoryTable";
import CustomToast from "@/components/CustomToast";
import Modal from "@/components/Modal";
import NoDataContent from "@/components/NoDataContent";
import { Skeleton } from "@/components/Skeleton";
import type { ICategory } from "@/types/ICategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Category = () => {
  const queryClient = useQueryClient();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const { data: dataCategories, isLoading: IsLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<ICategory[]> => {
      const response = await api.get(`/categories`);
      return response.data;
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      await api.delete(`/categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      CustomToast({
        title: "Categoria excluída com sucesso!",
        status: "success",
      });
      setCategoryId(0);
      setIsOpenDeleteModal(false);
    },
    onError: (response) => {
      console.log(response);
    },
  });

  const handleEdit = (id: ICategory) => {
    console.log("id", id);
    // const handleEdit = (edit: IExpense) => {
    // setEditExpenseValues(edit);
    // setIsOpenCreateOrEditModal(true);
  };

  const handleDelete = (id: number) => {
    console.log("id", id);
    setIsOpenDeleteModal(true);
    setCategoryId(id);
  };
  return (
    <div className="flex flex-col ">
      <h1 className="text-[2rem] mb-[2rem]">Categorias</h1>
      {IsLoadingCategories ? (
        <>
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[20rem] w-full mt-[2rem]" />
        </>
      ) : (
        <>
          {dataCategories?.length ? (
            <CategoryTable
              data={dataCategories || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <NoDataContent
              handleAction={() => console.log("ae")}
              title="Você ainda não possui categoria"
            />
          )}
        </>
      )}
      <Modal
        isOpen={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        title="Excluir categoria"
        confirmText="Excluir"
        onConfirm={() => deleteExpenseMutation.mutate()}
        isLoading={deleteExpenseMutation.isPending}
      >
        <p>Deseja realmente excluir esta categoria?</p>
      </Modal>
    </div>
  );
};

export default Category;
