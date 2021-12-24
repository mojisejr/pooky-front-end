import SectionHeader from "../SectionHeader";
import team1 from "../../images/Feem.JPG";
import team2 from "../../images/Min.JPG";
import polygonLogo from "../../images/polygonLogo1.png";
import openseaLogo from "../../images/openseaLogo1.png";
import moralisLogo from "../../images/moralisLogo1.png";
import rainbow2 from "../../images/Rainbow2.PNG";
import Image from "next/image";
import PookyTeamCard from "../PookyTeamCard";

function PookyTeamSection() {
  return (
    <div>
      <div className="pooky-team-section section w-screen text-gray-800 rounded-b-2xl flex flex-col relative z-10">
        <div
          className="absolute w-72 right-20 top-10"
          style={{ zIndex: "-1", transform: "rotate(-10deg)" }}
        >
          <Image src={rainbow2} alt="rainbow" />
        </div>
        <div
          className="absolute w-72 bottom-20"
          style={{ zIndex: "-1", transform: "rotate(10deg)" }}
        >
          <Image src={rainbow2} alt="rainbow" />
        </div>
        <SectionHeader text={"Pooky Puppy Team"} />
        <div className="grid md:grid-cols-2 grid-flow-row  md:ml-40 md:mr-40 rounded-2xl overflow-hidden md:shadow-2xl md:mt-20">
          <PookyTeamCard
            image={team1}
            name="Ola.pooky"
            profile={
              "Daytime farmer, Nighttime developer, that everyone call him and yess! he is the dog lover"
            }
          />
          <PookyTeamCard
            image={team2}
            name="Minny.pooky"
            profile={
              "The pooky artist. she has a strong passion about helping dog. give them the opportunity to live the better life."
            }
          />
        </div>
        <div className="flex-grow"></div>
        <div className="flex md:flex-row flex-col pt-3 pb-3 pl-10 pr-10 bg-opacity-40 bg-gray-200 justify-between items-center">
          <div className="w-24">
            <Image src={polygonLogo} alt="polygon logo"></Image>
            <Image src={openseaLogo} alt="opensea logo"></Image>
            <Image src={moralisLogo} alt="moralis logo"></Image>
          </div>
          <div className="md:text-xl text-sm text-center md:text-left">
            Copyright 2021 by Pooky Puppy World. all right reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default PookyTeamSection;
