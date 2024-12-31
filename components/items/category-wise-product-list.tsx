"use server";

import { getCategoryProductsData } from "@/data";
import { productsColumns } from "@/lib/columns";
import { DataTable } from "../data-table/custum-table";

export const CategorywiseProdutList = async ({ id }: { id: string }) => {
  const data = await getCategoryProductsData(id);

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
