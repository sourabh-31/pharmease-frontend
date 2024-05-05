import { useMedicineContext } from "../../context/MedicineContext";
import PlusIcon from "../../data/inventory-assets/plus.svg";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Search from "../../ui/Search";
import UpdateGroupForm from "./UpdateGroupForm";

function GroupDetailHeader() {
  const { detailSearch, setDetailSearch } = useMedicineContext();

  return (
    <div className="flex items-center justify-between mr-1 mt-6 mb-10">
      <div className="border-[1px] border-[#d1d5db] rounded-md">
        <Search
          placeholderText="Search Medicine..."
          width="20"
          bgColor="white"
          value={detailSearch}
          onChange={(e) => setDetailSearch(e.target.value)}
        />
      </div>
      <div className="-mt-1">
        <Modal>
          <Modal.Open opens="addMedToGrp">
            <Button bgColor="#01a768" img={PlusIcon} imgWidth="1.1rem">
              Add Medicine
            </Button>
          </Modal.Open>
          <Modal.Window name="addMedToGrp">
            <UpdateGroupForm />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default GroupDetailHeader;
