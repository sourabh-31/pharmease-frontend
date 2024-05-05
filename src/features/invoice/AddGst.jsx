import { useInvoiceContext } from "../../context/InvoiceContext";

function AddGst() {
  const { gst, setGst } = useInvoiceContext();

  return (
    <div className="w-[20rem]">
      <p className="text-2xl font-medium">Add GST%</p>
      <input
        type="number"
        placeholder="Add discount..."
        className="border-[1px] border-[#d1d5db] py-[0.5rem] px-[1rem] rounded-md mt-4 w-full"
        value={gst}
        onChange={(e) => setGst(+e.target.value)}
      />
    </div>
  );
}

export default AddGst;
