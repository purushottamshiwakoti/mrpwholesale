"use client";

import { Switch } from "@/components/ui/switch";
import { productSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { deleteProduct, updateProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadDropzone } from "@/utils/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AddCategoryDialog } from "../dialogs/add-category-dialog";

interface Category {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  price: string;
  availablity: boolean;
  categoryId: string;
  image: string;
}

export const EditProdutForm = ({
  data,
  productData,
}: {
  data: Category[];
  productData: Product;
}) => {
  console.log(productData);
  const {
    id,
    name,
    availablity,
    price,
    image: productImage,
    categoryId,
  } = productData;
  const [isPending, startTransisition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name,
      price,
      availablity,
      categoryId,
    },
  });
  const [image, setImage] = useState<string | null>(productImage || null);
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof productSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      values.image = image;
      updateProduct(values, id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/products");
          router.refresh();
        }
        if (data?.error) {
          // toast.error(data.error);
          toast.error(data.error);
        }
      });
    });
  }

  const handleDeleteImage = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (isConfirmed) {
      setImage(null);
      alert("Image deleted successfully.");
    }
  };

  function onDelete() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!isConfirmed) return;

    startTransisition(() => {
      deleteProduct(id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/products");
          router.refresh();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  }

  return (
    <div className=" ">
      <div className="flex gap-10">
        <Button onClick={() => router.back()} size="lg">
          Back
        </Button>
        <AddCategoryDialog />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name here"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Price here"
                    {...field}
                    disabled={isPending}
                    type="number"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availablity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Availablity</FormLabel>
                <FormControl>
                  <div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                      disabled={isPending}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.map((item) => (
                      <SelectItem value={item.id} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            {!image ? (
              <>
                <FormLabel>Product Image</FormLabel>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: { url: string }[]) => {
                    // Handle the response
                    console.log("Files: ", res);
                    setImage(res[0]?.url || ""); // Safeguard in case res[0].url is undefined
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Handle the error
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <FormDescription>
                  Image size of 1080*1080px is preffered
                </FormDescription>
              </>
            ) : (
              <>
                <FormLabel>Product Image</FormLabel>
                <div className="">
                  <div className="relative">
                    <ProductImage src={image} />

                    <Trash
                      className="bg-white rounded-md text-red-500 cursor cursor-pointer   absolute top-2 left-2"
                      onClick={handleDeleteImage}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={!image || isPending}
            >
              Update
            </Button>
          </div>
        </form>
        <Button
          className="w-full mt-5"
          variant="destructive"
          disabled={isPending}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Form>
    </div>
  );
};

export const ProductImage = ({ src }) => {
  return (
    <div className="relative  h-40 w-40">
      <Image
        width={200}
        height={200}
        src={src}
        alt="Uploaded Product Image"
        priority={true}
      />
    </div>
  );
};
