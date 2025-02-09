import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  useProducts,
  useCreateProduct,
  useDeleteProduct,
  type Product,
} from "../hooks/useProduct";
import { useState } from "react";
import DashboardLayout from "@/layouts/dashboardLayout";
import { withLayout } from "@/utils/withLayout";

// import axios from "axios"
interface Task {
  id?: number;
  email: string;
  username: string;
}

const createTask = async (task: Task): Promise<Task> => {
  const res = await fetch("https://fakestoreapi.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw Error(`failed to post ${res.status} ${await res.text()}`);

  return res.json();
};

const useCreateTask = () => {
  return useMutation<Task, Error, Task, unknown>({
    mutationFn: createTask,
    onSuccess: (data) => console.log("Task berhasil dibuat:", data),
    onError: (error) => console.error("Gagal menambahkan task:", error),
  });
};

const Home = () => {
  const [limit, setLimit] = useState<number>(5);
  const [sort, setSort] = useState<string | undefined>("");
  const limitData = [10, 20, 30, 40, 50];
  const {
    data: products,
    isLoading: productLoading,
    error: productsError,
  } = useProducts(limit, sort);
  const {
    mutate: createProduct,
    isPending: createLoading,
    error: createError,
  } = useCreateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const {
    mutate: createTask,
    isPending: createTaskLoading,
    error: createTaskError,
  } = useCreateTask();

  const handleAddProduct = () => {
    createProduct({
      title: "New Product",
      price: 99.99,
      description: "This is a new product",
      category: "electronics",
      image: "https://via.placeholder.com/150",
    });
  };
  const handleCreateTask = () => {
    const newTask = {
      email: "John@gmail.com",
      username: "johnd",
    };
    createTask(newTask);
  };
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden p-10">
      <main className="flex flex-col gap-8 row-start-2 max-md:items-center">
        {productLoading && <p>Loading...</p>}
        {productsError && <p>Error not found</p>}
        <div className="flex w-full gap-5 items-center h-fit">
          <button
            onClick={handleAddProduct}
            disabled={productLoading}
            className="btn"
          >
            {productLoading ? "Menambahkan..." : "Tambah Produk"}
          </button>
          {createError && (
            <p style={{ color: "red" }}>Error: {createError.message}</p>
          )}
          <button
            onClick={handleCreateTask}
            disabled={createTaskLoading}
            className="btn"
          >
            {createTaskLoading ? "Menambahkan..." : "Tambah Tugas"}
          </button>
          <select
            value={limit}
            onChange={(e) => setLimit(Number.parseInt(e.target.value, 10))}
            className="select select-bordered w-fit border-none"
          >
            {limitData.map((item: any, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered w-fit border-none"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6  w-full gap-5 h-fit place-content-around m-auto">
          {products?.map((item: Product, index: number) => {
            return (
              <div
                className="card bg-base-100 shadow-xl w-full sm:max-w-72 flex flex-col h-96"
                key={index}
              >
                {/* Gambar */}
                <figure className="w-full bg-cover bg-center">
                  <img
                    src={item.image}
                    alt="no have picture"
                    className="w-full md:max-h-52 object-cover"
                  />
                </figure>

                {/* Body Card */}
                <div className="card-body">
                  <h2 className="card-title truncate max-w-12 md:max-w-md">
                    {item.title}
                  </h2>
                  <p className="text-sm line-clamp-2 max-w-full md:max-w-md">
                    {item.description}
                  </p>

                  {/* Tombol */}
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">
                      ${item.price} Buy Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* {products?.map((item: Product, index: number) => {
            return (
              <div key={index}>
                <h1>{item.title}</h1>
                <img src={item.image} alt={item.title} className="w-20" />
                <p>{item.price}</p>
              </div>
            );
          })} */}
        </div>
        {/* <form>
          <input type="text" name="title" value={""} />
        </form> */}
      </main>
    </div>
  );
};
export default withLayout(Home, DashboardLayout);
