import { api } from "@/api/axios";
import CustomToast from "@/components/CustomToast";
import ProfileForm from "@/components/ProfileForm";
import { Skeleton } from "@/components/Skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProfileSchema } from "@/schemas/ProfileSchema";
import type { IApiError } from "@/types/IApiError";
import type { IUser } from "@/types/IUser";
import { formatCurrency } from "@/utils/formatCurrency";
import { parseCurrencyToNumber } from "@/utils/parseCurrencyToNumber";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const Profile = () => {
  const queryClient = useQueryClient();
  const { value: userId } = useLocalStorage<string | null>(
    "@finance:userId",
    null,
  );

  const { data: userData, isLoading } = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const response = await api.get<IUser>(`/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  const updateProfileMutation = useMutation<
    void,
    AxiosError<IApiError>,
    ProfileSchema
  >({
    mutationFn: async (payload: ProfileSchema) => {
      await api.put(`/users/${userId}`, {
        name: payload.name,
        salary: parseCurrencyToNumber(payload.salary),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      CustomToast({
        title: "Perfil atualizado com sucesso!",
        status: "success",
      });
    },
    onError: (error) => {
      CustomToast({
        title: error.response?.data?.error || "Erro ao atualizar perfil.",
        status: "error",
      });
    },
  });

  return (
    <div className="flex flex-col">
      <h1 className="text-[2rem] mb-[2rem]">Perfil</h1>

      {isLoading ? (
        <Skeleton className="h-[20rem] w-full" />
      ) : (
        <div className="m-auto md:w-[40rem] w-full flex flex-col justify-center  bg-white rounded-[4px]  ">
          <h2 className="text-[1.2rem] md:text-[1.5rem] mb-6">Editar</h2>
          <ProfileForm
            defaultValues={
              userData
                ? {
                    name: userData.name,
                    salary: formatCurrency(String(userData?.salary || 0)),
                  }
                : undefined
            }
            isLoading={updateProfileMutation.isPending}
            onSubmit={(data) => updateProfileMutation.mutate(data)}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
