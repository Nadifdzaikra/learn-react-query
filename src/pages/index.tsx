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

export default function Home() {
  const {
    data: products,
    isLoading: productLoading,
    error: productsError,
  } = useProducts();
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
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {productLoading && <p>Loading...</p>}
        {productsError && <p>Error not found</p>}
        <div>
          {products?.map((item: Product, index: number) => {
            return (
              <div key={index}>
                <h1>{item.title}</h1>
                <img src={item.image} alt={item.title} className="w-20" />
                <p>{item.price}</p>
              </div>
            );
          })}
        </div>
        {/* <form>
          <input type="text" name="title" value={""} />
        </form> */}
        <button onClick={handleAddProduct} disabled={productLoading}>
          {productLoading ? "Menambahkan..." : "Tambah Produk"}
        </button>
        {createError && (
          <p style={{ color: "red" }}>Error: {createError.message}</p>
        )}
        <button onClick={handleCreateTask} disabled={createTaskLoading}>
          {createTaskLoading ? "Menambahkan..." : "Tambah Tugas"}
        </button>
      </main>
    </div>
  );
}
