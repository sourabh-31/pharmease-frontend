import LiveLogo from "../../data/main-nav-assets/live.svg";
import CrossLogo from "../../data/main-nav-assets/cross.svg";
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
import { useInvoices } from "../invoice/useInvoiceAction";
import dayjs from "dayjs";
import { useReportContext } from "../../context/ReportContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LiveStat() {
  const { invoices } = useInvoices();

  const { setIsStatVisible } = useReportContext();

  const today = dayjs();

  const todaysInvoices = invoices.filter((invoice) => {
    return dayjs(invoice.paidAt).isSame(today, "day");
  });

  const todaysRevenue = todaysInvoices?.reduce(
    (prev, cur) => prev + cur.totalBill,
    0
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const length = todaysInvoices?.length || 0;
  const labels = Array(length + 3)
    .fill(undefined)
    .map((_, index) => index)
    .slice(1);

  const dataRevenue = todaysInvoices?.map((invoice) => invoice.totalBill);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: dataRevenue,
        borderColor: "#00e701",
        backgroundColor: "rgba(0, 231, 1, 0.5)",
      },
    ],
  };

  return (
    <section className="w-[20rem] bg-[#213743] rounded-t-lg rounded-b-md z-50">
      <div className="bg-[#1a2c38] text-white flex items-center justify-between px-4 py-3 rounded-t-lg">
        <div className="flex items-center gap-1">
          <img src={LiveLogo} alt="live" className="w-4" />
          <p className="font-semibold">Live Stats</p>
        </div>
        <button onClick={() => setIsStatVisible(false)}>
          <img src={CrossLogo} alt="cross" className="w-5" />
        </button>
      </div>

      <div className="bg-[#0f212e] text-white font-medium w-fit py-2 px-4 text-sm rounded-full ml-4 mt-3">
        Today
      </div>

      <div className="bg-[#0f212e] w-[90%] rounded-md ml-auto mr-auto px-7 py-4 flex justify-between mt-4">
        <div className="flex flex-col items-center">
          <p className="text-slate-300 font-semibold">Revenue</p>
          <p className="text-[#00e701] font-semibold">₹{todaysRevenue || 0}</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-slate-300 font-semibold">Invoice</p>
          <p className="text-white font-semibold">{todaysInvoices?.length}</p>
        </div>
      </div>

      <div className="p-4 bg-[#0f212e] w-[90%] ml-auto mr-auto mt-4 rounded-md">
        <Line options={options} data={data} />
      </div>

      <div className="pt-6" />
    </section>
  );
}

export default LiveStat;
