import { useQuery } from "@tanstack/react-query";
import { type User, getUsersById } from "../api/userApi";
export { User };
export const useGetUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ["users", id],
    queryFn: () => getUsersById(id),
    refetchOnWindowFocus: false,
  });
};
