"use client";

import Image from "next/image";
import { CatalougeContact } from "./items/catalouge-contact";
import { Product, ProductComponent } from "./product";
import { useRef, useState } from "react";
import html2canvas from "html2canvas"; // Import html2canvas directly
import jsPDF from "jspdf"; // Import jsPDF directly
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const CatalogComponent = ({ products }: { products: Product[] }) => {
  const productsPerPage = 9;
  const pages = Math.ceil(products.length / productsPerPage);

  // Store a reference for each page
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [downloading, setDownloading] = useState(false);

  const handleGeneratePdf = async () => {
    setDownloading(true);

    const pdf = new jsPDF(); // Create a new instance of jsPDF

    for (let pageIndex = 0; pageIndex < pageRefs.current.length; pageIndex++) {
      const ref = pageRefs.current[pageIndex];

      if (ref) {
        console.log(`Capturing page ${pageIndex + 1}`);

        // Ensure html2canvas captures the element correctly
        try {
          const canvas = await html2canvas(ref, { scale: 2 });

          // If it's not the first page, add a new page to the PDF
          if (pageIndex > 0) {
            pdf.addPage(); // Add a new page after the first one
          }

          // Convert canvas to image and add to the PDF
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          pdf.addImage(imgData, "JPEG", 0, 0, 210, 297); // Add the image to the PDF
        } catch (error) {
          console.error(`Error capturing page ${pageIndex + 1}:`, error);
        }
      }
    }

    // Save the generated PDF
    pdf.save("catalog.pdf");
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
      {downloading ? (
        <div className="flex items-center gap-2 mb-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <Button disabled>Generating PDF...</Button>
        </div>
      ) : (
        <Button onClick={handleGeneratePdf} className="mb-2">
          Generate PDF
        </Button>
      )}
      <div className="my-2 gap-5"></div>
      {Array.from({ length: pages }).map((_, pageIndex) => {
        const pageProducts = products.slice(
          pageIndex * productsPerPage,
          (pageIndex + 1) * productsPerPage
        );
        return (
          <div
            key={pageIndex}
            className="bg-white border-[1px] border-black w-[210mm] h-[297mm] mx-auto mb-10"
            id={`catalog-page-${pageIndex + 1}`}
            ref={(el: HTMLDivElement | null): void => {
              pageRefs.current[pageIndex] = el;
            }}
          >
            <div className="bg-white border h-16 flex items-center justify-between px-10">
              <Image
                src={"/logo.png"}
                alt="small logo"
                width={150}
                height={150}
              />
              <h1 className="text-xl font-semibold text-gray-800">
                Product Catalog
              </h1>
              <Image
                src={"/logo.png"}
                alt="small logo"
                width={150}
                height={150}
              />
            </div>
            <CatalougeContact />
            <ProductComponent products={pageProducts} />
            <div className="html2pdf__page-break"></div>
          </div>
        );
      })}
    </div>
  );
};

export default CatalogComponent;
