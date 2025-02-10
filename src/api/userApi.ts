export interface User {
  id?: number;
  username: string;
  email: string;
  address: {
    city: string;
  };
}
const API_URL = "https://fakestoreapi.com/users";

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
  return res.json();
};

export const getUsersById = async (id: number): Promise<User> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
  return res.json();
};
import axios from "axios";

// export const getUsersById = async (id: number): Promise<User> => {
//   const res = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );
//   return res.data;
// };
