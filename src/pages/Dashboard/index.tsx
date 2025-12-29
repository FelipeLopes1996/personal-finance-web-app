import { api } from "@/api/axios";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { value: userId } = useLocalStorage<string | null>(
    "@finance:userId",
    null
  );
  // const { data, isLoading, error } = useQuery({
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    },
    retry: 3,
  });

  const { name, salary } = data;

  return (
    <div>
      <DashboardCard userName={name} userSalary={salary} />
    </div>
  );
};

export default Dashboard;
