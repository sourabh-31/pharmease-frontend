import dayjs from "dayjs";
import { formatNumberWithCommas } from "../../utils/indianComa";
import { useCustomers } from "../customer/useCustomerAction";
import { useGroups } from "../inventory/useGroupAction";
import { useMedicines } from "../inventory/useMedicineAction";
import { useInvoices } from "../invoice/useInvoiceAction";
import DetailBox from "./DetailBox";
import { useNavigate } from "react-router-dom";
import { useReportContext } from "../../context/ReportContext";

function DashboardDetails() {
  const { medicines } = useMedicines();
  const medicineLength = medicines?.length;

  const { groups } = useGroups();
  const groupLength = groups?.length;

  const { invoices } = useInvoices();
  const invoiceLength = invoices?.length;
  const totalRevenue = invoices?.reduce((prev, cur) => prev + cur.totalBill, 0);

  const { customers } = useCustomers();
  const customerLength = customers?.length;

  const today = dayjs();
  const todaysInvoices = invoices.filter((invoice) => {
    return dayjs(invoice.paidAt).isSame(today, "day");
  });

  const todaysRevenue = todaysInvoices?.reduce(
    (prev, cur) => prev + cur.totalBill,
    0
  );

  const navigate = useNavigate();

  const { setIsStatVisible } = useReportContext();

  return (
    <div className="grid grid-cols-2 w-[95%] gap-x-12 gap-y-10 mt-12">
      {/* Inventory */}
      <DetailBox>
        <DetailBox.Header>
          <DetailBox.Heading>Inventory</DetailBox.Heading>
          <DetailBox.Action onClick={() => navigate("/inventory")}>
            Go to Inventory
          </DetailBox.Action>
        </DetailBox.Header>
        <DetailBox.Body>
          <DetailBox.DetailPart1>
            <p className="xl:text-xl 2xl:text-2xl font-bold">
              {formatNumberWithCommas(medicineLength)}
            </p>
            <p className="text-sm 2xl:text-base font-medium">
              Total no of Medicines
            </p>
          </DetailBox.DetailPart1>
          <DetailBox.DetailPart2>
            <p className="xl:text-xl 2xl:text-2xl font-bold">
              {formatNumberWithCommas(groupLength)}
            </p>
            <p className="text-sm 2xl:text-base font-medium">Medicine Groups</p>
          </DetailBox.DetailPart2>
        </DetailBox.Body>
      </DetailBox>

      {/* Quick Report  */}
      <DetailBox>
        <DetailBox.Header>
          <DetailBox.Heading>Quick Report</DetailBox.Heading>
          <DetailBox.Action onClick={() => navigate("/reports")}>
            Go to Reports
          </DetailBox.Action>
        </DetailBox.Header>
        <DetailBox.Body>
          <DetailBox.DetailPart1>
            <p className="xl:text-xl 2xl:text-2xl font-bold">
              ₹{formatNumberWithCommas(totalRevenue)}
            </p>
            <p className="text-sm 2xl:text-base font-medium">Medicines Sold</p>
          </DetailBox.DetailPart1>
          <DetailBox.DetailPart2>
            <p className="xl:text-xl 2xl:text-2xl font-bold">
              {formatNumberWithCommas(invoiceLength)}
            </p>
            <p className="text-sm 2xl:text-base font-medium">
              Invoices Generated
            </p>
          </DetailBox.DetailPart2>
        </DetailBox.Body>
      </DetailBox>

      {/* Customers  */}
      <DetailBox>
        <DetailBox.Header>
          <DetailBox.Heading>Customers</DetailBox.Heading>
          <DetailBox.Action onClick={() => navigate("/manage-customer")}>
            Go to Customers Page
          </DetailBox.Action>
        </DetailBox.Header>

        <DetailBox.DetailPart1 position="center">
          <p className="xl:text-xl 2xl:text-2xl font-bold">
            {formatNumberWithCommas(customerLength)}
          </p>
          <p className="text-sm 2xl:text-base font-medium">
            Total no of Customers
          </p>
        </DetailBox.DetailPart1>
      </DetailBox>

      <DetailBox>
        <DetailBox.Header>
          <DetailBox.Heading>Today&apos;s Revenue</DetailBox.Heading>
          <DetailBox.Action onClick={() => setIsStatVisible(true)}>
            Show
          </DetailBox.Action>
        </DetailBox.Header>

        <DetailBox.DetailPart1 position="center">
          <p className="xl:text-xl 2xl:text-2xl font-bold">
            ₹ {formatNumberWithCommas(todaysRevenue)}
          </p>
          <p className="text-sm 2xl:text-base font-medium">
            Today&apos;s Revenue
          </p>
        </DetailBox.DetailPart1>
      </DetailBox>
    </div>
  );
}

export default DashboardDetails;
