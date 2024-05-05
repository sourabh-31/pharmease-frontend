import Modal from "../../ui/Modal";

import DownArrowBlack from "../../data/assets/down-arrow-black.svg";
import MedicineGroupList from "./MedicineGroupList";
import { useMedicineContext } from "../../context/MedicineContext";

function SelectGroup() {
  const { groupName } = useMedicineContext();

  return (
    <Modal>
      <Modal.Open opens="select">
        <button className="border-[1px] border-[#d1d5db] px-6 py-[0.65rem] rounded-md flex items-center gap-4 bg-white">
          {groupName}
          <span>
            <img src={DownArrowBlack} alt="crossIcon" />
          </span>
        </button>
      </Modal.Open>
      <Modal.Window name="select">
        <MedicineGroupList />
      </Modal.Window>
    </Modal>
  );
}

export default SelectGroup;
