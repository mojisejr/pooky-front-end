import Link from "next/link";
import Image from "next/image";
import nftrade from "../images/nftrade.png";
import binanceLogo from "../images/binancelogo.png";

function Menu() {
  return (
    <div className="menu-box flex md:flex-row md:items-center flex-col text-xl gap-3 md:mr-10 md:p-5 p-10 bg-gray-300 bg-opacity-80 rounded-xl md:text-white text-black">
      <Link href="https://discord.gg/6JvuCPst">
        <a className="menu-item discord hover:text-purple-500" target="_blank">
          discord
        </a>
      </Link>
      <Link href="https://twitter.com/PookyPuppy">
        <a className="menu-item twitter hover:text-blue-400" target="_blank">
          twitter
        </a>
      </Link>
      <Link href="#">
        <a className="menu-item utility hover:text-pink-600">your NFT</a>
      </Link>
      <Link href="https://nftrade.com/marketplace">
        <a className="menu-item nftrade" target="_blank">
          <div className="w-24">
            <Image src={nftrade} alt="nftrade logo" />
          </div>
        </a>
      </Link>
      <div className="w-24">
        <Image src={binanceLogo} alt="binance logo" />
      </div>
    </div>
  );
}

export default Menu;
