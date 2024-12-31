import { LinkButton } from "@/components/custum/link-button";
import { ProductsList } from "@/components/items/products-list";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProductsPage = () => {
  return (
    <div className="mx-10  w-[50vw]">
      <div>
        <LinkButton name="Add" link="/products/add" />
      </div>
      <div className="mt-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-5">
        <ProductsList />
      </div>
    </div>
  );
};

export default ProductsPage;
