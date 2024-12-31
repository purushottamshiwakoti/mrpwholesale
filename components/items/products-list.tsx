"use server";

import { getProductsData } from "@/data";
import { productsColumns } from "@/lib/columns";
import { DataTable } from "../data-table/custum-table";

export const ProductsList = async () => {
  const data = await getProductsData();

  return (
    <div>
      {data?.length ? (
        <DataTable
          columns={productsColumns}
          data={data}
          placeholder="Filter Product..."
        />
      ) : (
        <div>No Products Added yet</div>
      )}
    </div>
  );
};
