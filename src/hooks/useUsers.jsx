import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    data: users,
    isLoading: isUsersLoading,
    refetch,
  } = useQuery({
    queryKey: ["role"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  return [users, isUsersLoading, refetch];
};
export default useUsers;
