import Image from "next/image";
import Link from "next/link";
import binanceLogo from "../../images/binancelogo.png";
import pookyLogo from "../../images/pookyplanet.PNG";
import nftrade from "../../images/nftrade.png";

function HomeSection() {
  return (
    <div className="home-section section w-screen text-white md:rounded-t-2xl md:shadow-2xl">
      <div className="header-box flex md:justify-between items-center pt-6 flex-col md:flex-row">
        <div className="logo-box p-logo md:flex md:flex-col hidden">
          <div className="md:text-5xl text-3xl font-bold">Pooky</div>
          <div className="md:text-xl text-sm">Puppy World</div>
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

        <div className="menu-box flex md:flex-row md:items-center flex-col text-xl gap-3 md:mr-10 md:p-5 p-10 mt-5 bg-gray-300 bg-opacity-80 rounded-xl md:text-white text-black">
          <Link href="">
            <a className="menu-item discord hover:text-purple-500">discord</a>
          </Link>
          <Link href="">
            <a className="menu-item twitter hover:text-blue-400">twitter</a>
          </Link>
          <Link href="">
            <a className="menu-item utility hover:text-pink-600">utility</a>
          </Link>
          <Link href="">
            <a className="menu-item nftrade">
              <div className="w-24">
                <Image src={nftrade} alt="nftrade logo" />
              </div>
            </a>
          </Link>
          <div className="w-24">
            <Image src={binanceLogo} alt="binance logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
