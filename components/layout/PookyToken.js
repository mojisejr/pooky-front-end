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
              Pooky Puppy NFT is the 3000 unique cuties Pomparanian in the
              world. you can name her the way you like with the suffix [.pooky]
              and your puppy name will change in the opensea token name and
              description as the dynamic metadata! sound coool right!? and it
              get updates on the Opensea!, so hold her tight and make her your
              most favorite NFT in your collection. because she comes with
              random disconting rate (0 - 20%) it will be used for discount
              anything in the Pookaverse and any other event might use this too!
              only the first Generation will have this property. Generated at
              the minting time. every 200 pookies minted will be giveaway BNB
              (in Matic) to one lucky adopter! that it!? No! the adopter who
              mint the last one token number 3000 will get back{" "}
              <span className="text-yellow-200 md:text-2xl">4BNB</span> and the
              last minter will get{" "}
              <span className="text-yellow-200 md:text-2xl">10BNB!</span>{" "}
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
