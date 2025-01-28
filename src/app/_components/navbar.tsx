import ExternalLink from "@/components/ui/external-link";
import VisuallyHidden from "@/components/devtools/visually-hidden";
import { ContainerWrapper } from "@/components/ui/wrappers";
import Link from "next/link";
import MobileNavigation from "./mobile-navigation";
import MainNavigation from "./main-navigation";
import GitHub from "@/components/icons/github";

export default function Navbar() {
  return (
    <header className="h-16 border-b">
      <ContainerWrapper>
        <div className="flex size-full items-center justify-between gap-4">
          <Link className="mr-auto font-semibold" href="/">
            elissadesign
            <VisuallyHidden>logo</VisuallyHidden>
          </Link>

          <MainNavigation />

          <ExternalLink
            title="GitHub"
            href="https://github.com/elissadesign/template"
            showIcon
          >
            <GitHub className="size-5" />
          </ExternalLink>

          <MobileNavigation />
        </div>
      </ContainerWrapper>
    </header>
  );
}
