"use server";
import { unstable_noStore as noStore } from "next/cache";

import db from "@/lib/db";

export async function getCategoryData() {
  try {
    const data = await db.category.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}
export async function getSingleCategoryData(id: string) {
  try {
    const data = await db.category.findUnique({
      where: {
        id,
      },
    });
    noStore();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getProductsData() {
  try {
    const data = await db.product.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    noStore();

    return data;
  } catch (error) {
    return null;
  }
}

export async function getSingleProductData(id: string) {
  try {
    const data = await db.product.findUnique({
      where: {
        id,
      },
    });
    noStore();

    return data;
  } catch (error) {
    return null;
  }
}
export async function getCategoryProductsData(id: string) {
  try {
    const data = await db.product.findMany({
      where: {
        categoryId: id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    noStore();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getCategoryProducts() {
  try {
    const data = await db.category.findMany({
      where: {
        products: {
          some: {},
        },
      },
      include: {
        products: {
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    noStore();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getProductsDataById(id: string) {
  try {
    let data; // Declare `data` outside the conditional blocks.

    if (id === "1") {
      data = await db.product.findMany({
        where: {
          availablity: true,
        },
        orderBy: {
          category: {
            name: "asc",
          },
        },
      });
    } else {
      data = await db.product.findMany({
        where: {
          categoryId: id,
          availablity: true,
        },
        orderBy: {
          name: "asc",
        },
      });
    }
    noStore();
    return data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    return null;
  }
}

export const getSumData = async () => {
  try {
    // Use Promise.all to fetch product and category counts concurrently
    const [productCountResult, categoryCountResult] = await Promise.all([
      db.product.aggregate({
        _count: {
          _all: true,
        },
      }),
      db.category.aggregate({
        _count: {
          _all: true,
        },
      }),
    ]);

    return { productCountResult, categoryCountResult };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch product and category data.");
  }
};
