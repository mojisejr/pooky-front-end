import Image from "next/image";
import pookyLogo from "../../images/Logo.png";
import planet1 from "../../images/MainPicture1.PNG";
import stars from "../../images/bgStar.PNG";
import Menu from "../Menu";

function HomeSection() {
  return (
    <div className="home-section section w-screen text-white md:rounded-t-2xl md:block flex flex-col justify-center">
      <div className="absolute">
        <Image src={stars} alt="stars" />
      </div>
      <div className="header-box flex md:justify-between items-center pt-6 flex-col md:flex-row">
        <div className="logo-box w-80 md:flex md:flex-col hidden p-5">
          <Image src={pookyLogo} alt="pooky logo" />
        </div>
        <div className="logo-box flex flex-col items-center justify-center md:hidden">
          <div className="w-72">
            <Image src={pookyLogo} alt="pooky logo" />
          </div>
        </div>
        <div className="z-10">
          <Menu />
        </div>
      </div>
      <div className="home-body-container md:flex justify-center hidden">
        <div className="max-w-xl">
          <Image src={planet1} alt="planet" />
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
