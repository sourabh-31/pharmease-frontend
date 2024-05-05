import LogoImg from "../data/assets/logo.svg";

function Logo() {
  return (
    <div className="bg-[#1d242e] flex items-center justify-center gap-4 py-4 pr-6">
      <img src={LogoImg} alt="logo" />
      <p className="text-white text-2xl font-semibold">PharmEase</p>
    </div>
  );
}

export default Logo;
