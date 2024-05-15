import GetHelp from "../features/help/GetHelp";
import Heading from "../ui/Heading";
import SubHeading from "../ui/SubHeading";

function Help() {
  return (
    <section className="px-12 mt-6">
      <div>
        <Heading>Get Help</Heading>
        <SubHeading>Get any help by typing your query.</SubHeading>
      </div>
      <GetHelp />
    </section>
  );
}

export default Help;
