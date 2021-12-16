import Image from "next/image";
import pookyLogo from "../../images/Logo.png";
import planet1 from "../../images/aMainPicture1.png";
import stars from "../../images/bgStar.png";
import Menu from "../Menu";

function HomeSection() {
  return (
    <div className="home-section section w-screen text-white md:rounded-t-2xl md:shadow-2xl">
      <div className="absolute">
        <Image src={stars} alt="stars" />
      </div>
      <div className="header-box flex md:justify-between items-center pt-6 flex-col md:flex-row">
        <div className="logo-box w-80 md:flex md:flex-col hidden p-5">
          <Image src={pookyLogo} alt="pooky logo" />
        </div>
        <div className="logo-box flex flex-col items-center md:hidden">
          <div className="rounded-full">
            <Image src={pookyLogo} alt="small logo" width={150} height={150} />
          </div>
          <div>
            <div className="md:text-5xl text-3xl font-bold">Pooky</div>
            <div className="md:text-xl text-sm">Puppy World</div>
          </div>
        </div>
        <div className="z-10">
          <Menu />
        </div>
      </div>
      <div className="home-body-container flex justify-center">
        <div className="max-w-xl">
          <Image src={planet1} alt="planet" />
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
