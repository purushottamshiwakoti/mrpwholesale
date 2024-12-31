"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const categoryColumns = [
  {
    accessorKey: "name",
    header: ({
      column,
    }: {
      column: {
        toggleSorting: (ascending: boolean) => void;
        getIsSorted: () => string | undefined;
      };
    }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column?.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const detail = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <Link href={`/category/${detail.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/category/view/${detail.id}`}>VIew Products</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export const productsColumns = [
  {
    accessorKey: "name",
    header: ({
      column,
    }: {
      column: {
        toggleSorting: (ascending: boolean) => void;
        getIsSorted: () => string | undefined;
      };
    }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "availablity",
    header: "Availabilityablity",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const detail = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <Link href={`/products/${detail.id}`}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
