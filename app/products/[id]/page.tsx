import { EditProdutForm } from "@/components/forms/edit-product-form";
import { getCategoryData, getSingleProductData } from "@/data";
import { notFound } from "next/navigation";

const EditCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [data, productData] = await Promise.all([
    getCategoryData(),
    getSingleProductData(id),
  ]);
  if (!productData) {
    return notFound();
  }
  console.log(productData, data);

  return (
    <div className="mx-10 w-[50vw]">
      <div className="mt-5">
        <EditProdutForm data={data} productData={productData} />
      </div>
    </div>
  );
};

export default EditCategory;
