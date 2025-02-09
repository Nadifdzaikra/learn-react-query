export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const API_URL = "https://fakestoreapi.com/products";

// Fetch semua produk
export const fetchProducts = async (
  limit: number = 5,
  sort?: string
): Promise<Product[]> => {
  const res = await fetch(`${API_URL}?limit=${limit}&sort=${sort}`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
  return res.json();
};

// Tambah produk baru
export const postProduct = async (data: Product): Promise<Product> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
  return res.json();
};

// Hapus produk
export const deleteProduct = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);
};
