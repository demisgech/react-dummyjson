import apiClient from "./api-client";

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
}

export class ProductService {
  public getAllProduct() {
    const controller = new AbortController();

    const products = apiClient.get("/products", {
      signal: controller.signal,
    });

    return { products, cancle: (): void => controller.abort() };
  }

  public createProduct(product: Product) {
    return apiClient.post("/products/add", product);
  }
  public deleteProduct(id: number) {
    return apiClient.delete("/products/" + id);
  }

  public updateProduct(product: Product) {
    return apiClient.patch("/products/" + product.id, product);
  }
}
