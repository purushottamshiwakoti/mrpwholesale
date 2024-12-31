"use client";

import { categorySchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { deleteCategory, updateCategory } from "@/actions/category";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Category {
  id: string;
  name: string;
}

export const EditCategoryForm = ({ data }: { data: Category }) => {
  const { name, id } = data;
  console.log(data);
  const [isPending, startTransisition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: name,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof categorySchema>) {
    // Do something with the form values.

    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      updateCategory(values, id).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.push("/category");
          router.refresh();
        }
        if (data?.error) {
          // toast.error(data.error);
          toast.error(data.error);
        }
      });
    });
  }
  function onDelete() {
    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!isConfirmed) {
      return null;
    } else {
      startTransisition(() => {
        deleteCategory(id).then((data) => {
          if (data?.success) {
            toast.success(data.success);
            router.push("/category");
            router.refresh();
          }
          if (data?.error) {
            toast.error(data.error);
          }
        });
      });
    }

    // If confirmed, proceed with deletion
  }

  return (
    <div className=" ">
      <div className="my-5">
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
              <BreadcrumbPage>Add</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Category Name here"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" ">
            <Button type="submit" className="w-44" disabled={isPending}>
              Update
            </Button>
          </div>
        </form>
        <Button
          variant="destructive"
          className="w-44 mt-5"
          onClick={onDelete}
          disabled={isPending}
        >
          Delete
        </Button>
      </Form>
    </div>
  );
};
