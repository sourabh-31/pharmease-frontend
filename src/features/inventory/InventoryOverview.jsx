import QuickBox from "../../ui/QuickBox";

import BagLogo from "../../data/assets/bag.svg";
import GreenBagLogo from "../../data/assets/greenBag.svg";
import CautionLogo from "../../data/assets/caution.svg";
import BlackCautionLogo from "../../data/assets/blackCaution.svg";
import { useNavigate } from "react-router-dom";
import {
  useEmptyMedicines,
  useExpiredMedicines,
  useMedicines,
} from "./useMedicineAction";
import { useGroups } from "./useGroupAction";
import { formatNumberWithCommas } from "../../utils/indianComa";

function InventoryOverview() {
  const navigate = useNavigate();

  const { medicines } = useMedicines();
  const medicineLength = medicines?.length;

  const { groups } = useGroups();
  const groupLength = groups?.length;

  const { empty } = useEmptyMedicines();
  const emptyLength = empty?.length;

  const { expired } = useExpiredMedicines();
  const expiredLength = expired?.length;

  return (
    <div className="grid grid-cols-4 mt-8 gap-[3.7vw]">
      <QuickBox color="#03a9f5" bgColor="#a7dbf5" width="16">
        <QuickBox.Icon>
          <img src={BagLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>
          {formatNumberWithCommas(medicineLength)}
        </QuickBox.Value>
        <QuickBox.Detail>Medicine Available</QuickBox.Detail>
        <QuickBox.Action onClick={() => navigate("/inventory/medicines")}>
          View Full List
        </QuickBox.Action>
      </QuickBox>

      <QuickBox color="#01a768" bgColor="#a6dbcb" width="16">
        <QuickBox.Icon>
          <img src={GreenBagLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>{formatNumberWithCommas(groupLength)}</QuickBox.Value>
        <QuickBox.Detail>Medicine Groups</QuickBox.Detail>
        <QuickBox.Action onClick={() => navigate("/inventory/groups")}>
          View Groups
        </QuickBox.Action>
      </QuickBox>

      <QuickBox color="#f0483e" bgColor="#eebebe" width="16">
        <QuickBox.Icon>
          <img src={CautionLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>{formatNumberWithCommas(emptyLength)}</QuickBox.Value>
        <QuickBox.Detail>Medicine Shortage</QuickBox.Detail>
        <QuickBox.Action onClick={() => navigate("/inventory/medicines")}>
          Resolve Now
        </QuickBox.Action>
      </QuickBox>

      <QuickBox color="#1d242e" bgColor="#afb4b9" width="16">
        <QuickBox.Icon>
          <img src={BlackCautionLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>{formatNumberWithCommas(expiredLength)}</QuickBox.Value>
        <QuickBox.Detail>Expired Medicines</QuickBox.Detail>
        <QuickBox.Action onClick={() => navigate("/inventory/expired")}>
          Dispose Now
        </QuickBox.Action>
      </QuickBox>
    </div>
  );
}

export default InventoryOverview;
