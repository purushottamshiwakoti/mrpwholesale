import { CatalogComponent } from "@/components/catalog";
import { getCategoryProducts } from "@/data";

const ViewCatalouge = async () => {
  const products = await getCategoryProducts();

  return (
    <div>
      <CatalogComponent categories={products} />
    </div>
  );
};

export default ViewCatalouge;
