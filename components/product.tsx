import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: string;
  categoryName: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  availablity: boolean;
}

export const ProductComponent = ({ products }: { products: Product[] }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2   ">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

const Product = ({
  product,
}: {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: string;
    categoryName: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    availablity: boolean;
  };
}) => {
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = false;

  return (
    <div key={product.id} className="  bg-white relative  ">
      {/* Product Image */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="bg-white">
        <Image
          src={product.image}
          alt={product.name}
          width={1080} // Adjust to the desired width
          height={1080} // Adjust to the desired height
          className={` h-[15.4rem] w-full object-contain 
            ${isLoading ? "opacity-0" : "opacity-100"}
          `}
          // onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Product Details */}
      <div className=" flex flex-col px-2  ">
        {/* Product Name */}
        <h1 className="text-base font-bold mt-1 line-clamp-2  min-h-14 text-center">
          {product.name}
        </h1>

        {/* Price Section */}
        <p className="text-base font-bold text-gray-800 text-center">
          Rs {product.price}
        </p>

        {/* Stock Badge */}

        {/* <div className="absolute top-0 right-0">
          <div
            className={` rounded-lg text-center text-white font-semibold ${
              product.availablity ? "bg-green-500" : "bg-rose-500"
            }`}
          >
            {product.availablity ? "In Stock" : "Out of Stock"}
          </div>
        </div> */}
        <div className="absolute top-2 ">
          <Image
            src={"/smalllogo.png"}
            alt="small logo"
            width={25}
            height={25}
          />
        </div>
      </div>
    </div>
  );
};

// const ProductImage = ({ src, alt }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   return (
//     <div className="relative w-full h-40">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//           <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}
//       <Image
//         src={src}
//         alt={alt}
//         className={`w-full h-60 object-cover ${
//           isLoading ? "opacity-0" : "opacity-100"
//         }`}
//         width={1080}
//         height={1080}
//         onLoad={() => setIsLoading(false)}
//       />
//     </div>
//   );
// };

// export default ProductImage;
