import BackgroundEffect from "@/components/ui/background-effect";
import { H1, H2, H3 } from "@/components/ui/headings";
import { ContainerWrapper, SectionWrapper } from "@/components/ui/wrappers";

export default function HomePage() {
  return (
    <>
      <section className="border-b">
        <ContainerWrapper className="wrapper relative">
          <BackgroundEffect />

          <SectionWrapper className="space-y-2">
            <H1>Hello World!</H1>
            <p className="text-muted-foreground">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Possimus, incidunt quaerat suscipit ipsam repudiandae dolor.
            </p>
            <H2>Hello World!</H2>
            <p className="text-muted-foreground">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Possimus, incidunt quaerat suscipit ipsam repudiandae dolor.
            </p>
            <H3>Hello World!</H3>
            <p className="text-muted-foreground">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Possimus, incidunt quaerat suscipit ipsam repudiandae dolor.
            </p>
          </SectionWrapper>
        </ContainerWrapper>
      </section>
    </>
  );
}
