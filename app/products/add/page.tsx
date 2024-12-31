import { AddProdutForm } from "@/components/forms/add-product-form";
import { getCategoryData } from "@/data";

const AddProduct = async () => {
  const data = await getCategoryData();
  return (
    <div className="mx-10 w-[50vw]">
      <AddProdutForm data={data} />
    </div>
  );
};

export default AddProduct;
