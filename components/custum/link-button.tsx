import { Button } from "@/components/ui/button";
import Link from "next/link";
export const LinkButton = ({ name, link }: { name: string; link: string }) => {
  return (
    <>
      <Button asChild size="lg">
        <Link href={link}>{name}</Link>
      </Button>
    </>
  );
};
