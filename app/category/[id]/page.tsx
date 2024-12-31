import { LinkButton } from "@/components/custum/link-button";
import { EditCategoryForm } from "@/components/forms/edit-category-form";
import { getSingleCategoryData } from "@/data";
import { notFound } from "next/navigation";

const EditCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getSingleCategoryData(id);
  if (!data) {
    return notFound();
  }

  return (
    <div className="mx-10 w-[50vw]">
      <div>
        <LinkButton name="Back" link="/category" />
      </div>
      <div className="mt-5">
        <EditCategoryForm data={data} />
      </div>
    </div>
  );
};

export default EditCategory;
