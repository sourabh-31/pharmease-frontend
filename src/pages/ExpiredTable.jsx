import toast from "react-hot-toast";
import ExpiredRow from "../features/inventory/ExpiredRow";
import { useExpiredMedicines } from "../features/inventory/useMedicineAction";
import Search from "../ui/Search";
import Spinner from "../ui/Spinner";
import SubHeading from "../ui/SubHeading";
import Table from "../ui/Table";
import { useMedicineContext } from "../context/MedicineContext";

function ExpiredTable() {
  const { isLoading, error, expired } = useExpiredMedicines();

  const { expiredSearch, setExpiredSearch } = useMedicineContext();

  const filteredExpired = expired.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(expiredSearch.toLowerCase())
  );

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  return (
    <section>
      <SubHeading>List of Expired Medicines</SubHeading>
      <div className="flex mt-6 mb-10">
        <div className="border-[1px] border-[#d1d5db] rounded-md">
          <Search
            placeholderText="Search Expired..."
            width="20"
            bgColor="white"
            value={expiredSearch}
            onChange={(e) => setExpiredSearch(e.target.value)}
          />
        </div>
      </div>

      <Table column="1.8fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Medicine Name</div>
          <div>Price</div>
          <div className="-ml-1">Stock in Qty</div>
          <div>Expired Date</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={filteredExpired}
          render={(medicine) => (
            <ExpiredRow key={medicine._id} medicine={medicine} />
          )}
        />
      </Table>
      <Table.Footer />
    </section>
  );
}

export default ExpiredTable;
