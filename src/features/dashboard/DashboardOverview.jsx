import QuickBox from "../../ui/QuickBox";

import MoneyLogo from "../../data/assets/money.svg";
import BagLogo from "../../data/assets/bag.svg";
import CautionLogo from "../../data/assets/caution.svg";
import { formatNumberWithCommas } from "../../utils/indianComa";
import { useInvoices } from "../invoice/useInvoiceAction";
import {
  useEmptyMedicines,
  useMedicines,
} from "../inventory/useMedicineAction";
import { useNavigate } from "react-router-dom";

function DashboardOverview() {
  const { invoices } = useInvoices();
  const totalRevenue = invoices?.reduce((prev, cur) => prev + cur.totalBill, 0);

  const { medicines } = useMedicines();
  const medicineLength = medicines?.length;

  const { empty } = useEmptyMedicines();
  const emptyLength = empty?.length;

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 mt-8 gap-10">
      <QuickBox color="#fed600" bgColor="#f2e9ac" width="20">
        <QuickBox.Icon>
          <img src={MoneyLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>
          Rs. {formatNumberWithCommas(totalRevenue)}
        </QuickBox.Value>
        <QuickBox.Detail>Total Revenue</QuickBox.Detail>
        <QuickBox.Action onClick={() => navigate("/reports")}>
          View Detailed Report
        </QuickBox.Action>
      </QuickBox>

      <QuickBox color="#03a9f5" bgColor="#a7dbf5" width="20">
        <QuickBox.Icon>
          <img src={BagLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>
          {formatNumberWithCommas(medicineLength)}
        </QuickBox.Value>
        <QuickBox.Detail>Medicine Available</QuickBox.Detail>
        <QuickBox.Action onClick={() => navigate("/inventory/medicines")}>
          View Inventory
        </QuickBox.Action>
      </QuickBox>

      <QuickBox color="#f0483e" bgColor="#eebebe" width="20">
        <QuickBox.Icon>
          <img src={CautionLogo} alt="money-logo" />
        </QuickBox.Icon>
        <QuickBox.Value>{formatNumberWithCommas(emptyLength)}</QuickBox.Value>
        <QuickBox.Detail>Medicine Shortage</QuickBox.Detail>
        <QuickBox.Action onClick={() => navigate("/inventory/medicines")}>
          Resolve Now
        </QuickBox.Action>
      </QuickBox>
    </div>
  );
}

export default DashboardOverview;
