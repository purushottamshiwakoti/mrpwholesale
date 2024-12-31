"use client";

import { categorySchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

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
import { addCategory } from "@/actions/category";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCategoryDialog } from "@/hooks/use-dialog";

export const AddCategoryForm = ({ back }: { back?: boolean }) => {
  const { closeDialog } = useCategoryDialog();

  const [isPending, startTransisition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof categorySchema>) {
    // Do something with the form values.

    // ✅ This will be type-safe and validated.
    startTransisition(() => {
      addCategory(values).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          closeDialog();
          !back && router.push("/category");
          router.refresh();
        }
        if (data?.error) {
          // toast.error(data.error);
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <div className=" ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
