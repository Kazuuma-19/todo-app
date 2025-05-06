import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { axiosInstance } from "@/lib/axios";
import { authUserAtom } from "@/stores/authAtom";

export const useAuthInit = () => {
  const setUser = useSetAtom(authUserAtom);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/me");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);
};
