import Button from "../../ui/Button";

function GetHelp() {
  return (
    <div className="mt-12 ml-4 mr-4">
      <p className="text-xl">How can we help you today?</p>
      <textarea
        className="w-full border border-[#d1d5db] rounded-md h-[16rem] py-2 px-4 mt-4"
        placeholder="start typing your query..."
      />
      <div className="mt-8 flex justify-end">
        <Button bgColor="#01a768">Submit</Button>
      </div>
    </div>
  );
}

export default GetHelp;
