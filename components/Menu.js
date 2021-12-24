import Link from "next/link";
import Image from "next/image";
import polygonLogo from "../images/polygonLogo1.png";
import openseaLogo from "../images/openseaLogo1.png";

function Menu() {
  return (
    <div className="menu-box flex md:flex-row md:items-center flex-col text-xl gap-3 md:mr-10 md:p-5 p-10 bg-gray-300 bg-opacity-80 rounded-xl md:text-white text-black shadow-2xl">
      <Link href="#">
        <a className="menu-item utility hover:text-pink-600">OG NFT</a>
      </Link>
      <Link href="#">
        <a className="menu-item utility hover:text-pink-600">XMAS NFT</a>
      </Link>
      <Link href="https://discord.gg/MBmCRCKpYB">
        <a className="menu-item discord hover:text-purple-500" target="_blank">
          discord
        </a>
      </Link>
      <Link href="https://twitter.com/pookypuppynft">
        <a className="menu-item twitter hover:text-blue-400" target="_blank">
          twitter
        </a>
      </Link>
      <Link href="#">
        <a className="menu-item nftrade hover:text-blue-700" target="_blank">
          <div className="w-24">
            <Image src={openseaLogo} alt="opensea logo" />
          </div>
        </a>
      </Link>
      <div className="w-24">
        <Image src={polygonLogo} alt="polygon logo" />
      </div>
    </div>
  );
}

export default Menu;
