import SectionHeader from "../SectionHeader";
import pookyGif1 from "../../images/pooky-gif1.gif";
import Image from "next/image";

function PookyTokenSection() {
  return (
    <div>
      <div className="pooky-token-section section w-screen shadow-2xl text-white">
        <SectionHeader text={"Pooky Puppy NFT"} />
        <div className="token-container flex flex-col items-center md:pl-40 md:pr-40 pt-5">
          <div className="token-image w-72">
            <Image
              className="rounded-2xl"
              src={pookyGif1}
              alt="pooky puppy nft"
            ></Image>
          </div>
          <div className="token-content p-5 md:text-xl text-xs">
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
              the minting time. every 200 pookies minted will be giveaway ETH
              (in Matic) to one lucky adopter! that it!? No! the adopter who
              mint the last one token number 8000 will get back 0.5ETH (in
              Matic).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PookyTokenSection;
