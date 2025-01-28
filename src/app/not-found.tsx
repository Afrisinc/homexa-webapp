import { Button } from "@/components/ui/button";
import { ContainerWrapper } from "@/components/ui/wrappers";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <ContainerWrapper className="relative">
      <div className="grid size-full place-content-center gap-4 max-sm:place-items-start sm:text-center">
        <p className="text-2xl font-bold sm:text-4xl">404 - Page Not Found</p>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>

        <Button className="flex items-center gap-2 p-0" variant="link">
          <MoveLeft />
          <Link href={"/"}>Go back home</Link>
        </Button>
      </div>
    </ContainerWrapper>
  );
}
