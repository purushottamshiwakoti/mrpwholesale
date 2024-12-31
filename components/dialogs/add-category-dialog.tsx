import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCategoryDialog } from "@/hooks/use-dialog";
import { AddCategoryForm } from "../forms/add-category-form";
import { Button } from "../ui/button";

export const AddCategoryDialog = () => {
  const { isDialogOpen, openDialog } = useCategoryDialog();
  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={openDialog}>
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <AddCategoryForm back />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
