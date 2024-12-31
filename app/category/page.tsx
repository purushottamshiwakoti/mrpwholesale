export const dynamic = "force-dynamic";

import { LinkButton } from "@/components/custum/link-button";
import { CategoryList } from "@/components/items/category-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";

const ProductsPage = async () => {
  return (
    <div className="mx-10 w-[50vw]">
      <div>
        <LinkButton name="Add" link="/category/add" />
      </div>
      <div className="mt-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-5">
        <CategoryList />
      </div>
    </div>
  );
};

export default ProductsPage;
