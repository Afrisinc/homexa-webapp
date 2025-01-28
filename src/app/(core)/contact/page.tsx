import { H1 } from "@/components/ui/headings";
import { ContainerWrapper, SectionWrapper } from "@/components/ui/wrappers";
import CommaSeparatedInput from "./_components/comma-separated-input";

export default function ContactPage() {
  return (
    <>
      <ContainerWrapper>
        <SectionWrapper>
          <H1>Contact me</H1>
          <p className="text-pretty">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem odit
            nisi maxime, mollitia quos unde molestiae fugit quisquam
            exercitationem, laudantium aliquid?
          </p>
        </SectionWrapper>

        <SectionWrapper>
          <form className="flex flex-col gap-4">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" />
            <label className="flex flex-col">
              Tags
              <CommaSeparatedInput />
            </label>
            <button type="submit">Send</button>
          </form>
        </SectionWrapper>
      </ContainerWrapper>
    </>
  );
}
