import Tablet from "../../data/landing-assets/tablet.svg";
import Heart from "../../data/landing-assets/heart.svg";
import Eye from "../../data/landing-assets/eye.svg";
import Brain from "../../data/landing-assets/brain.svg";

function Features() {
  return (
    <section className="mt-24">
      <div className="flex flex-col items-center text-center">
        <p className="border border-[#cecece] w-fit tracking-[0.3rem] px-2 py-1">
          FEATURES
        </p>
        <p className="text-3xl font-medium mt-6">Feel Like Home With Best</p>
        <p className="text-3xl font-medium mt-1">Medical Care</p>
      </div>

      <div className="grid grid-cols-4 mt-16 gap-[3.5vw]">
        <div className="bg-[#f1f1f1] w-[20vw] px-6 pt-10 pb-16">
          <img src={Tablet} alt="icon" className="w-10" />
          <p className="text-xl font-semibold mt-4">Inventory Management</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Manage inventory by batches with expiry dates</li>
            <li>Sell the stock in First Expiry First out order (FEFO)</li>
            <li>Manage stocks in multiple locations</li>
            <li>Track shelf locations of inventory</li>
          </ul>
        </div>

        <div className="bg-[#f1f1f1] w-[20vw] px-6 pt-10 pb-16">
          <img src={Heart} alt="icon" className="w-10" />
          <p className="text-xl font-semibold mt-5">Analytics Dashboard</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Track real time performance and make informed decisions</li>
            <li>Keep Track of your customers</li>
            <li>Get real time notifications when shortage of medicines</li>
            <li>Track shelf locations of inventory</li>
          </ul>
        </div>

        <div className="bg-[#f1f1f1] w-[20vw] px-6 pt-10 pb-16">
          <img src={Eye} alt="icon" className="w-10" />
          <p className="text-xl font-semibold mt-6">Pharmacy Billing</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Add customer details easily</li>
            <li>Add medicines or group of medicines to invoice</li>
            <li>Manage stocks in multiple locations</li>
            <li>Print drug labels, prescriptions and invoices</li>
          </ul>
        </div>

        <div className="bg-[#f1f1f1] w-[20vw] px-6 pt-10 pb-16">
          <img src={Brain} alt="icon" className="w-10" />
          <p className="text-xl font-semibold mt-4">Pharmacy CRM</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Medicine administration reminders</li>
            <li>Refill reminders</li>
            <li>
              Make custom groups for recurring customers to add medicines to
              invoice in one click
            </li>
            <li>Loyalty rewards</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Features;
