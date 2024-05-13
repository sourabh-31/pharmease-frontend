import Logo from "../../data/landing-assets/logo.svg";
import Phone from "../../data/landing-assets/call.svg";
import Mail from "../../data/landing-assets/mail.svg";

function Footer() {
  return (
    <section className="mt-24 bg-[#e5f2ef]  px-20 pt-16 pb-24">
      <div className="flex items-center justify-between">
        <img src={Logo} alt="logo" className="w-[10rem]" />
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-2">
            <img src={Phone} alt="phone" />
            <p className="text-[#545454] font-semibold">+91 1234567891</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={Mail} alt="email" />
            <p className="text-[#545454] font-semibold">
              support@pharmease.com
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 ml-4 flex justify-between">
        <p className="text-3xl font-semibold w-[30rem]">
          Are you a pharmacy chain or drugstore looking for any of these
          softwares? Then we can help.
        </p>

        <div className="flex gap-[10rem]">
          <div>
            <p className="text-xl font-semibold">Explore</p>
            <ul className="mt-2 font-medium text-[#545454] flex flex-col gap-1">
              <li>
                <button>Home</button>
              </li>
              <li>
                <button>Features</button>
              </li>
              <li>
                <button>Pricing</button>
              </li>
              <li>
                <button>Contact Us</button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-semibold">Contact Us</p>
            <input
              placeholder="Your Email Address"
              type="text"
              className="px-3 py-3 w-[14rem] mt-3 placeholder:text-sm outline-none text-sm"
            />
            <button className="mt-5 bg-[#01a768] block text-white py-3 px-6 font-medium text-sm">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
