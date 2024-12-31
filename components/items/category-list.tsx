"use server";

import { getCategoryData } from "@/data";
import { DataTable } from "../data-table/custum-table";
import { categoryColumns } from "@/lib/columns";

export const CategoryList = async () => {
  const data = await getCategoryData();

  return (
    <div>
      {data?.length ? (
        <DataTable
          columns={categoryColumns}
          data={data}
          placeholder="Filter Category..."
        />
      ) : (
        <div>No Category Added yet</div>
      )}
    </div>
  );
};
