import Logo_Icon from "../assets/logoPage/Logo_Icon.png";
const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-[15px]">
      <figure className="max-w-[32px]">
        <img srcSet={`${Logo_Icon} 2x`} alt="logo" />
      </figure>
      <span className="poppins-bold leading-[32px]">ShopBi</span>
    </div>
  );
};

export default Logo;
