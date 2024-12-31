import CatalogComponent from "@/components/catalog";
import { LinkButton } from "@/components/custum/link-button";
import { getProductsDataById } from "@/data";

const ViewCatalouge = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const products = await getProductsDataById(id);

  return (
    <div className="mx-10 w-[80vw]">
      <div>
        <LinkButton link="/catalouge" name="Back" />
      </div>
      <CatalogComponent products={products} />
    </div>
  );
};

export default ViewCatalouge;
