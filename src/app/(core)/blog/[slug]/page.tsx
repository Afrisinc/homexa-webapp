import { ContainerWrapper, SectionWrapper } from "@/components/ui/wrappers";
import { Section } from "lucide-react";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

interface Props {
  // params are always parsed as strings by default
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <ContainerWrapper>
      <SectionWrapper>{slug}</SectionWrapper>
    </ContainerWrapper>
  );
}
