import { Outlet, useLocation } from "react-router-dom";
import { getCustomHeading } from "../utils/GetCustomHeading";

import PlusIcon from "../data/inventory-assets/plus.svg";

import Heading from "../ui/Heading";
import SubHeading from "../ui/SubHeading";
import InventoryOverview from "../features/inventory/InventoryOverview";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CreateMedicineForm from "../features/inventory/CreateMedicineForm";
import CreateGroupForm from "../features/inventory/CreateGroupForm";

function Inventory() {
  const location = useLocation();
  const pathName = location.pathname.endsWith("/inventory");

  return (
    <section className="pl-12 pr-16 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading>{getCustomHeading(location.pathname)}</Heading>
          {location.pathname.endsWith("/groups") && (
            <SubHeading>List of medicine groups</SubHeading>
          )}

          {location.pathname.endsWith("/inventory") && (
            <SubHeading>List of medicines available for sales</SubHeading>
          )}

          {location.pathname.endsWith("/medicines") && (
            <SubHeading>List of medicines available for sales</SubHeading>
          )}
        </div>

        {location.pathname.endsWith("/medicines") && (
          <Modal>
            <Modal.Open opens="addMed">
              <Button img={PlusIcon} bgColor="#01a768">
                Add New Item
              </Button>
            </Modal.Open>
            <Modal.Window name="addMed">
              <CreateMedicineForm />
            </Modal.Window>
          </Modal>
        )}

        {location.pathname.endsWith("/groups") && (
          <Modal>
            <Modal.Open opens="addGroup">
              <Button img={PlusIcon} bgColor="#01a768">
                Add New Group
              </Button>
            </Modal.Open>
            <Modal.Window name="addGroup">
              <CreateGroupForm />
            </Modal.Window>
          </Modal>
        )}
      </div>

      {pathName ? <InventoryOverview /> : <Outlet />}
    </section>
  );
}

export default Inventory;
