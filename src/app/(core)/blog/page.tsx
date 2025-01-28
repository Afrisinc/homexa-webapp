import { H1 } from "@/components/ui/headings";
import { ContainerWrapper, SectionWrapper } from "@/components/ui/wrappers";

export default function BlogPage() {
  return (
    <ContainerWrapper>
      <SectionWrapper>
        <H1>Blog</H1>
        <p className="text-pretty">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem odit
          nisi maxime, mollitia quos unde molestiae fugit quisquam
          exercitationem, laudantium aliquid?
        </p>
      </SectionWrapper>
    </ContainerWrapper>
  );
}
