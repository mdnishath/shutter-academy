import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, setLoading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery(
    ["role", user?.email],
    async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      setLoading(false);
      return res.data.role;
    }
  );

  return [role, isRoleLoading];
};

export default useRole;
