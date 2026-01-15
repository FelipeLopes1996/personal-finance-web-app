import { api } from "@/api/axios";
import { Button } from "@/components/Button";
import CategoryForm from "@/components/CategoryForm";
import CategoryTable from "@/components/CategoryTable";
import CustomToast from "@/components/CustomToast";
import Modal from "@/components/Modal";
import NoDataContent from "@/components/NoDataContent";
import { Skeleton } from "@/components/Skeleton";
import type { ICategory } from "@/types/ICategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
interface ApiError {
  message: string;
  error: string;
  errors?: Record<string, string[]>;
}

const Category = () => {
  const queryClient = useQueryClient();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [editCategoryValues, setEditCategoryValues] =
    useState<ICategory | null>(null);

  const [isOpenCreateOrEditModal, setIsOpenCreateOrEditModal] =
    useState<boolean>(false);
  const { data: dataCategories, isLoading: IsLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<ICategory[]> => {
      const response = await api.get(`/categories`);
      return response.data;
    },
  });

  const createCategoryMutation = useMutation<
    void,
    AxiosError<ApiError>,
    ICategory
  >({
    mutationFn: async (payload: ICategory) => {
      await api.post(`/categories`, payload);
    },
    onSuccess: () => {
      // Atualiza a lista após deletar
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      CustomToast({
        title: "Categoria adicionada com sucesso!",
        status: "success",
      });
      setIsOpenCreateOrEditModal(false);
    },
    onError: (errors) => {
      CustomToast({
        title: errors?.response?.data?.error,
        status: "error",
      });
    },
  });

  const editCategoryMutation = useMutation<
    void,
    AxiosError<ApiError>,
    ICategory
  >({
    mutationFn: async (payload: ICategory): Promise<void> => {
      await api.put(`/categories/${editCategoryValues?.id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      CustomToast({
        title: "Categoria salvo com sucesso!",
        status: "success",
      });
      setIsOpenCreateOrEditModal(false);
    },
    onError: (errors) => {
      CustomToast({
        title: errors?.response?.data?.error,
        status: "error",
      });
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

  const handleEdit = (edit: ICategory) => {
    setEditCategoryValues(edit);
    setIsOpenCreateOrEditModal(true);
  };

  const handleDelete = (id: number) => {
    setIsOpenDeleteModal(true);
    setCategoryId(id);
  };

  const handleOrEditCreate = () => {
    setIsOpenCreateOrEditModal(true);
  };

  const handleCloseCreateOrEdit = () => {
    setEditCategoryValues(null);
    setIsOpenCreateOrEditModal(false);
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
            <div className="w-full mt-[2rem] bg-white rounded-[4px] overflow-hidden md:shadow-md">
              <div className="flex items-center justify-between bg-white pb-6 md:p-6 shadow-none md:shadow-md ">
                <h2 className="text-[1.2rem] md:text-[1.5rem]">
                  Lista de categorias
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
              <CategoryTable
                data={dataCategories || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ) : (
            <NoDataContent
              handleAction={handleOrEditCreate}
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

      <Modal
        isOpen={isOpenCreateOrEditModal}
        isForm={true}
        onClose={handleCloseCreateOrEdit}
        title={editCategoryValues ? "Editar categoria" : "Adicionar categoria"}
        onConfirm={() => {}}
        isLoading={deleteExpenseMutation.isPending}
      >
        <CategoryForm
          sendCreateOrEditCategory={
            editCategoryValues
              ? editCategoryMutation.mutate
              : createCategoryMutation.mutate
          }
          isLoading={
            createCategoryMutation.isPending ||
            editCategoryMutation.isPending ||
            false
          }
          defaultValues={
            editCategoryValues
              ? {
                  name: editCategoryValues?.name,
                }
              : undefined
          }
        />
      </Modal>
    </div>
  );
};

export default Category;
