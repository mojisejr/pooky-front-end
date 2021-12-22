import SectionHeader from "../SectionHeader";
import pookyGif1 from "../../images/pooky-gif1.gif";
import rainbow from "../../images/Rainbow2.PNG";
import cloud1 from "../../images/Cloud1.PNG";
import Image from "next/image";
import Link from "next/link";

function PookyTokenSection() {
  return (
    <div>
      <div className="relative pooky-token-section section w-screen text-gray-800">
        <div className="absolute top-40 left-10 w-72 hidden md:block">
          <Image src={rainbow} alt="rainbow" />
        </div>
        <div className="absolute w-72 top-40 right-10 hidden md:block">
          <Image src={cloud1} alt="cloud" />
        </div>
        <SectionHeader text={"Pooky Puppy NFT"} />
        <div className="token-container flex flex-col items-center md:pl-40 md:pr-40 pt-5">
          <div className="token-image w-72">
            <Image
              className="rounded-2xl"
              src={pookyGif1}
              alt="pooky puppy nft"
            ></Image>
          </div>
          <div className="token-content p-5 md:text-lg text-xs">
            <p>
              Pooky Puppy NFT is the 3000 unique adorable pomeranian metaverse.
              you can name her the way you like with the suffix [.pooky] and
              your puppy name will change at the Opensea. token name and
              description as the dynamic metadata! sound coool, and it get
              updates on the Opensea! so holder will get the random on-chain
              discount rate (upto 20%) each pooky nft will have different
              discount rate (the more % the more rarity) it will be used for
              discount anything in the Pookaverse (future project). only this
              generation will have this property. Discount rate will be
              generated at the mint time. for the fast giveaway. So every 200
              pookies minted will be giveaway{" "}
              <span className="text-purple-700 md:text-2xl">MATIC</span> to one
              lucky minter! that it!? No! the minter who mint the last one at
              token number 3000 will get{" "}
              <span className="text-purple-700 md:text-2xl">
                special MATIC amount !
              </span>{" "}
              <span>
                <Link href="https://discord.gg/6JvuCPst">
                  <a className="text-pink-700" target="_blank">
                    join our discord for more info !
                  </a>
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PookyTokenSection;
