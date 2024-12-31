export const dynamic = "force-dynamic";

import { LinkButton } from "@/components/custum/link-button";
import { CategorywiseProdutList } from "@/components/items/category-wise-product-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ViewProductsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="mx-10 w-[50vw]">
      <div>
        <LinkButton name="Back" link="/category" />
      </div>
      <div className="mt-7">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/category">Category</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-5">
        <CategorywiseProdutList id={id} />
      </div>
    </div>
  );
};

export default ViewProductsPage;
