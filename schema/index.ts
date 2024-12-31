import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, {
    message: "Product must be at least 2 characters.",
  }),
  availablity: z.boolean({
    message: "Availableablity is required",
  }),
  price: z.string({
    message: "Price is required",
  }),
  image: z.string().optional(),
  categoryId: z.string({
    message: "Category is required",
  }),
});
export const categorySchema = z.object({
  name: z.string({
    message: "Category name is required.",
  }),
});
