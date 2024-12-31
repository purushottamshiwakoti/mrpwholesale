import { getSumData } from "@/data";
import { ShoppingBag, Layers } from "lucide-react";

export const Dashboard = async () => {
  const data = await getSumData();
  console.log(data);
  const { productCountResult, categoryCountResult } = data;

  return (
    <div className="mx-10 my-10 w-full space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome to HomeTechNepal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Total Categories Card */}
        <div className="flex items-center p-5 bg-white shadow-md rounded-lg">
          <div className="p-4 bg-blue-100 rounded-full">
            <Layers className="text-blue-500 w-6 h-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Categories
            </h3>
            <p className="text-xl font-bold text-gray-900">
              {categoryCountResult._count._all}
            </p>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="flex items-center p-5 bg-white shadow-md rounded-lg">
          <div className="p-4 bg-green-100 rounded-full">
            <ShoppingBag className="text-green-500 w-6 h-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Products
            </h3>
            <p className="text-xl font-bold text-gray-900">
              {productCountResult._count._all}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
