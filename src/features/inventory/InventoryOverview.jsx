import QuickBox from "../../ui/QuickBox";

import BagLogo from "../../data/assets/bag.svg";
import GreenBagLogo from "../../data/assets/greenBag.svg";
import CautionLogo from "../../data/assets/caution.svg";
import BlackCautionLogo from "../../data/assets/blackCaution.svg";

function InventoryOverview() {
  return (
    <div className="grid grid-cols-4 mt-8 gap-[3.7vw]">
      <QuickBox color="#03a9f5" bgColor="#a7dbf5" width="16">
        <QuickBox.Icon>
          <img src={BagLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>298</QuickBox.Value>
        <QuickBox.Detail>Medicine Available</QuickBox.Detail>
        <QuickBox.Action>View Full List</QuickBox.Action>
      </QuickBox>

      <QuickBox color="#01a768" bgColor="#a6dbcb" width="16">
        <QuickBox.Icon>
          <img src={GreenBagLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>02</QuickBox.Value>
        <QuickBox.Detail>Medicine Groups</QuickBox.Detail>
        <QuickBox.Action>View Groups</QuickBox.Action>
      </QuickBox>

      <QuickBox color="#f0483e" bgColor="#eebebe" width="16">
        <QuickBox.Icon>
          <img src={CautionLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>01</QuickBox.Value>
        <QuickBox.Detail>Medicine Shortage</QuickBox.Detail>
        <QuickBox.Action>Resolve Now</QuickBox.Action>
      </QuickBox>

      <QuickBox color="#1d242e" bgColor="#afb4b9" width="16">
        <QuickBox.Icon>
          <img src={BlackCautionLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>30</QuickBox.Value>
        <QuickBox.Detail>Expired Medicines</QuickBox.Detail>
        <QuickBox.Action>Dispose Now</QuickBox.Action>
      </QuickBox>
    </div>
  );
}

export default InventoryOverview;
