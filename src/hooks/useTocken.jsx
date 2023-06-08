import { API } from "./useAxios";

const useToken = async (currentUser) => {
  try {
    if (currentUser) {
      console.log(currentUser);
      const res = await API.post("/jwt", {
        email: currentUser.email,
      });
      localStorage.setItem("access-token", res.data.token);
      return res.data.token;
    } else {
      localStorage.removeItem("access-token");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default useToken;
