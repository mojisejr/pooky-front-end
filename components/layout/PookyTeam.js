import SectionHeader from "../SectionHeader";
import team1 from "../../images/1.png";
import team2 from "../../images/2.png";
import binanceLogo from "../../images/binancelogo.png";
import Image from "next/image";
import PookyTeamCard from "../PookyTeamCard";

function PookyTeamSection() {
  return (
    <div>
      <div className="pooky-team-section section w-screen shadow-2xl text-white rounded-b-2xl flex flex-col">
        <SectionHeader text={"Pooky Puppy Team"} />
        <div className="grid grid-cols-2  ml-40 mr-40 rounded-2xl overflow-hidden shadow-2xl mt-20">
          <PookyTeamCard
            image={team1}
            name="Ola.pooky"
            profile={
              "Daytime farmer, Nighttime developer, that everyone call her and yes! she is the dog lover"
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
        <div className="flex pt-3 pb-3 pl-10 pr-10 bg-opacity-40 bg-gray-200 justify-between items-center">
          <div className="max-w-xs">
            <Image src={binanceLogo} alt="binance logo"></Image>
          </div>
          <div className="text-xl">
            Copyright 2021 by Pooky Puppy World. all right reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default PookyTeamSection;
