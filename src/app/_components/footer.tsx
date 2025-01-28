import ExternalLink from "@/components/ui/external-link";
import { ContainerWrapper } from "@/components/ui/wrappers";

export default function Footer() {
  return (
    <footer className="border-t">
      <ContainerWrapper>
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} elissadesign.
          </p>

          <ExternalLink
            title="GitHub"
            href="https://github.com/elissadesign/template"
            showIcon
            className="text-sm text-muted-foreground"
          >
            github
          </ExternalLink>
        </div>
      </ContainerWrapper>
    </footer>
  );
}
