import Image from "next/image";
import Link from "next/link";
import binanceLogo from "../../images/binancelogo.png";
function HomeSection() {
  return (
    <div>
      <div className="home-section section w-screen text-white shadow-2xl rounded-t-2xl">
        <div className="header-box flex justify-between pt-6">
          <div className="logo-box p-logo">
            <div className="text-5xl font-bold">Pooky</div>
            <div className="text-xl">Puppy World</div>
          </div>

          <div className="menu-box flex text-xl gap-3 pr-10 pt-10">
            <Link href="">
              <a className="menu-item discord hover:text-purple-500">discord</a>
            </Link>
            <Link href="">
              <a className="menu-item twitter hover:text-blue-400">twitter</a>
            </Link>
            <Link href="">
              <a className="menu-item nftrade hover:text-yellow-300">
                marketplace
              </a>
            </Link>
            <Link href="">
              <a className="menu-item utility hover:text-pink-600">utility</a>
            </Link>
            <div className="w-24">
              <Image src={binanceLogo} alt="binance logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
