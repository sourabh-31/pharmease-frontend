import QuickBox from "../../ui/QuickBox";

import MoneyLogo from "../../data/assets/money.svg";
import BagLogo from "../../data/assets/bag.svg";
import CautionLogo from "../../data/assets/caution.svg";

function DashboardOverview() {
  return (
    <div className="grid grid-cols-3 mt-8 gap-10">
      <QuickBox color="#fed600" bgColor="#f2e9ac" width="20">
        <QuickBox.Icon>
          <img src={MoneyLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>Rs. 8,55,875</QuickBox.Value>
        <QuickBox.Detail>Revenue : Jan 2022</QuickBox.Detail>
        <QuickBox.Action>View Detailed Report</QuickBox.Action>
      </QuickBox>

      <QuickBox color="#03a9f5" bgColor="#a7dbf5" width="20">
        <QuickBox.Icon>
          <img src={BagLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>298</QuickBox.Value>
        <QuickBox.Detail>Medicine Available</QuickBox.Detail>
        <QuickBox.Action>View Inventory</QuickBox.Action>
      </QuickBox>

      <QuickBox color="#f0483e" bgColor="#eebebe" width="20">
        <QuickBox.Icon>
          <img src={CautionLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>01</QuickBox.Value>
        <QuickBox.Detail>Medicine Shortage</QuickBox.Detail>
        <QuickBox.Action>Resolve Now</QuickBox.Action>
      </QuickBox>
    </div>
  );
}

export default DashboardOverview;
