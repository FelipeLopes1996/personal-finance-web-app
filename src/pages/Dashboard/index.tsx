import { api } from "@/api/axios";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import { Skeleton } from "@/components/Skeleton";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <>
          <Skeleton className="h-[10rem] w-full" />
        </>
      ) : (
        <DashboardCard userName={data?.name} userSalary={data?.salary} />
      )}
    </div>
  );
};

export default Dashboard;
