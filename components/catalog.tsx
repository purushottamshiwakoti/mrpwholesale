"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
  availablity: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

function adjustPrice(price: string): string {
  const numericPrice = parseFloat(price);
  const increasedPrice = numericPrice * 1.25;
  const roundedPrice = Math.ceil(increasedPrice / 10) * 10;
  return roundedPrice.toString();
}

export const CatalogComponent = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories =
    categories &&
    categories
      .map((category) => ({
        ...category,
        products: category.products
          .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => ({
            ...product,
            price: adjustPrice(product.price),
          })),
      }))
      .filter((category) => category.products.length > 0);

  return (
    <div className="lg:p-6 lg:mx-20 md:mx-2 mx-1">
      {/* <FloatingWhatsApp
        phoneNumber="+9779702651404"
        accountName="Wholesale pasale"
        statusMessage="Typically replies within 10 minutes"
      /> */}
      <div>
        <h1 className="w-full text-center font-bold text-[#D24054] lg:text-3xl text-xl">
          Wholesale Pasale Catalog
        </h1>
      </div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D24054]"
        />
      </div>
      {categories && filteredCategories.length > 0 ? (
        categories &&
        filteredCategories.map((category) => (
          <div key={category.id}>
            <div className="lg:my-5 my-3">
              <span className="text-2xl p-1 font-bold rounded-md bg-[#D24054] text-white mb-4">
                {category.name}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-6 gap-1">
              {category &&
                category.products.map((product) => (
                  <div
                    key={product.id}
                    className="p-1 border rounded-lg relative shadow-sm bg-white hover:shadow-lg"
                  >
                    <Button
                      className={`absolute top-1 right-1 text-lg font-semibold ${
                        product.availablity ? "bg-green-700" : "bg-red-700"
                      }`}
                    >
                      {product.availablity ? "In Stock" : "Out of Stock"}
                    </Button>
                    <Image
                      width={1080}
                      height={1080}
                      src={product.image}
                      alt={product.name}
                      className="rounded-t-lg"
                    />
                    <h3 className="text-lg font-semibold text-gray-700 mt-4">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 font-bold text-xl mt-2">
                      Price: Rs.{adjustPrice(product.price)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};
