import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      console.log("Get Users by admin", res);
      return res.data;
    },
  });
  return [users, isUsersLoading];
};
export default useUsers;
