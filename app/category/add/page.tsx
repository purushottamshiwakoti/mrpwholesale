import { LinkButton } from "@/components/custum/link-button";
import { AddCategoryForm } from "@/components/forms/add-category-form";

const AddProduct = () => {
  return (
    <div className="mx-10 w-[50vw]">
      <div>
        <LinkButton name="Back" link="/category" />
      </div>
      <div className="mt-5">
        <AddCategoryForm />
      </div>
    </div>
  );
};

export default AddProduct;
