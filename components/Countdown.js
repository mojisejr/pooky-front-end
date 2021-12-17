import Image from "next/image";
import rainbow2 from "../images/Rainbow2.PNG";
import cloud1 from "../images/Cloud2.PNG";
import cloud2 from "../images/Cloud1.PNG";
function Countdown({ timerComponents }) {
  return (
    <div className="flex flex-col w-full items-center gap-10 relative">
      <div className="absolute w-72 -top-36 left-28">
        <Image src={cloud1} alt="particle" />
      </div>
      <div className="absolute w-72 top-28 left-10">
        <Image src={cloud2} alt="particle" />
      </div>
      <div className="absolute w-72 right-9">
        <Image src={cloud2} alt="particle" />
      </div>
      <div
        className="absolute w-48 -top-28 right-52"
        style={{ transform: "rotate(-7deg)" }}
      >
        <Image src={rainbow2} alt="particle" />
      </div>
      <div className="text-3xl">Public sale will be live in..</div>
      <div className="text-6xl bg-gradient-to-tr from-pink-300 to-purple-400 bg-clip-text text-transparent">
        {timerComponents}
      </div>
      <div className="text-sm">
        <ul>
          <li>* get discount from our artist forever.</li>
          <li>* dynamic metadata NFT !</li>
          <li>* be part of animal charity donation.</li>
          <li>* build a strong thailand community driven NFT.</li>
          <li>* have fun with BNB giveaway until the last minting!</li>
        </ul>
      </div>
    </div>
  );
}

export default Countdown;