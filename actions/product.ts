"use server";
import db from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { productSchema } from "@/schema";
import z from "zod";

export const addProduct = async (values: z.infer<typeof productSchema>) => {
  console.log(values);
  const validateSchema = productSchema.safeParse(values);
  if (!validateSchema.success) {
    return { error: "Something wennt wrong" };
  }
  console.log(values);
  const { name, price, image, availablity, categoryId } = values;
  const slug = generateSlug(name);

  const existingCategory = await db.category.findUnique({
    where: { slug },
  });
  if (existingCategory) {
    return { error: "Category already exists" }; // Return error if category already exists  // Return success message if category is added successfully  // Use the zod safeParse function to validate the input values before creating the category in the database.  // Use the generateSlug function to create a unique slug for each category.  // Check if a category with the same slug already exists in the database before creating a new one.  // If a category with the same slug already exists, return an error message.  // If no error is found, create a new category in the database using the provided name and slug.  // Return a success message indicating that the category has been added successfully.  // Use the zod safeParse function to validate the input values before creating the category in the database.  // Use the generateSlug function to create a unique slug for each category.  // Check if a category with the same slug already exists in the database before creating a new one
  }
  await db.product.create({
    data: {
      name,
      slug,
      availablity,
      image,
      price,
      categoryId,
    },
  });

  return { success: "Successfully added Product" };
};

export const updateProduct = async (
  values: z.infer<typeof productSchema>,
  id: string
) => {
  console.log(values);
  const validateSchema = productSchema.safeParse(values);
  if (!validateSchema.success) {
    return { error: "Something wennt wrong" };
  }
  const { name, price, image, availablity, categoryId } = values;
  const slug = generateSlug(name);

  const existingData = await db.product.findUnique({
    where: { id },
  });
  if (!existingData) {
    return { error: "No Data exists" }; // Return error if category already exists  // Return success message if category is added successfully  // Use the zod safeParse function to validate the input values before creating the category in the database.  // Use the generateSlug function to create a unique slug for each category.  // Check if a category with the same slug already exists in the database before creating a new one.  // If a category with the same slug already exists, return an error message.  // If no error is found, create a new category in the database using the provided name and slug.  // Return a success message indicating that the category has been added successfully.  // Use the zod safeParse function to validate the input values before creating the category in the database.  // Use the generateSlug function to create a unique slug for each category.  // Check if a category with the same slug already exists in the database before creating a new one
  }
  await db.product.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      availablity,
      categoryId,
      image,
      price,
    },
  });

  return { success: "Successfully updated Product" };
};
export const deleteProduct = async (id: string) => {
  const existingData = await db.product.findUnique({
    where: { id },
  });
  if (!existingData) {
    return { error: "No Data exists" }; // Return error if category already exists  // Return success message if category is added successfully  // Use the zod safeParse function to validate the input values before creating the category in the database.  // Use the generateSlug function to create a unique slug for each category.  // Check if a category with the same slug already exists in the database before creating a new one.  // If a category with the same slug already exists, return an error message.  // If no error is found, create a new category in the database using the provided name and slug.  // Return a success message indicating that the category has been added successfully.  // Use the zod safeParse function to validate the input values before creating the category in the database.  // Use the generateSlug function to create a unique slug for each category.  // Check if a category with the same slug already exists in the database before creating a new one
  }
  await db.product.delete({
    where: {
      id,
    },
  });

  return { success: "Successfully deleted product" };
};
