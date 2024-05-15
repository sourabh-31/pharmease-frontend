import toast from "react-hot-toast";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { useInvoices } from "../invoice/useInvoiceAction";
import ReportsRow from "./ReportsRow";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useReportContext } from "../../context/ReportContext";
import dayjs from "dayjs";
import { formatNumberWithCommas } from "../../utils/indianComa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

function ReportsTable() {
  const { isLoading, invoices, error } = useInvoices();

  const { selectedMonth, selectedYear, query } = useReportContext();

  const label =
    selectedMonth !== "" || selectedYear !== ""
      ? `${selectedMonth} ${selectedYear}`
      : "Total Revenue";

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  let filteredInvoices;

  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filteredInvoices = invoices?.filter((invoice) => {
      const nameMatch = invoice.name.toLowerCase().includes(lowerCaseQuery);
      const mobileNumberMatch = invoice.mobileNumber
        .toString()
        .includes(lowerCaseQuery);
      return nameMatch || mobileNumberMatch;
    });
  } else {
    filteredInvoices = invoices?.filter((invoice) => {
      const invoiceDate = dayjs(invoice.paidAt);
      const invoiceMonth = invoiceDate.month();
      const invoiceYear = invoiceDate.year();
      const today = new Date();
      const currentYear = dayjs(today).year();

      // Filter based on month and year
      if (selectedMonth === "" && selectedYear === "") {
        return true;
      }
      const selectedMonthIndex = monthMap[selectedMonth];
      const selectedYearValue = parseInt(selectedYear);
      if (selectedMonth !== "" && selectedYear !== "") {
        return (
          invoiceMonth === selectedMonthIndex &&
          invoiceYear === selectedYearValue
        );
      }
      if (selectedMonth !== "" && selectedYear === "") {
        return (
          invoiceMonth === selectedMonthIndex && invoiceYear === currentYear
        );
      }
      if (selectedMonth === "" && selectedYear !== "") {
        return invoiceYear === selectedYearValue;
      }

      return false;
    });
  }

  const totalBillsPerDay = new Array(31).fill(0);

  filteredInvoices?.forEach((invoice) => {
    const paidAtDay = dayjs(invoice.paidAt).date() - 1;
    totalBillsPerDay[paidAtDay] += invoice.totalBill;
  });

  const totalRev = totalBillsPerDay?.reduce((prev, cur) => (cur += prev), 0);

  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: totalBillsPerDay,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex gap-12">
      <div className="w-[50%] border border-[#a1a1aa] p-6 h-fit bg-white">
        <Line options={options} data={data} />
        <p className="text-center font-medium mt-2 text-sm text-gray-500">
          Date
        </p>
        <div className="bg-white py-4 px-8 border border-[#a1a1aa] mt-8 flex items-center justify-center gap-4">
          <p className="text-2xl font-semibold">{label}:</p>
          <p className="text-3xl font-bold">
            ₹{formatNumberWithCommas(totalRev)}
          </p>
        </div>
      </div>
      <div className="w-[50%]">
        <Table column="1.1fr 1fr 1fr ">
          <Table.Header>
            <div className="ml-1">Bill No.</div>
            <div>Date</div>
            <div>Action</div>
          </Table.Header>
          <Table.Body
            data={filteredInvoices}
            render={(invoice) => (
              <ReportsRow key={invoice._id} invoice={invoice} />
            )}
          />
        </Table>
        <Table.Footer />
      </div>
    </div>
  );
}

export default ReportsTable;
