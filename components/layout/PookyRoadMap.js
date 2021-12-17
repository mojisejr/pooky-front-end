import SectionHeader from "../SectionHeader";
function PookyRoadMapSection() {
  return (
    <div>
      <div className="relative pooky-roadmap-section section w-screen text-pink-400">
        <SectionHeader text={"Road Map to Pookaverse"} />
        <div className="roadmap-container flex justify-center md:pt-10 p-5">
          <ul className="md:text-xl md:pr-40 md:pl-40 md:space-y-10">
            <li>
              <span className="text-2xl text-blue-400">Phase 1: </span> Public
              sale open! no whitelist. Weekly game contest, giveaway during the
              way of public sale the giveaway machanic will be run automatically
              with no control until sold out the last minter will be get the
              jackpot giveaway.
            </li>
            <li>
              <span className="text-2xl text-blue-400">Phase 2: </span> 1st
              sharity donation when Pooky puppy sold out. (could be change)
              release pooky male generation. and that is the fist adopter will
              get discount. and breeding system will be the next station.
            </li>
            <li>
              <span className="text-2xl text-blue-400">Phase 3: </span>Breeding
              system release (free + gas). Pooky puppy land in Pookaverse (in
              the sandbox game). this time hopefully pooky puppy world has a
              strong community. So try to partner with other world to make a
              stronger community and make pooky NFT more functional.
            </li>
            <li>
              <span className="text-2xl text-blue-400">Phase 4: </span> After
              finished land buying in the sandbox game we well combine it
              together and make a real Pookaverse!!.. we know it really long
              way. but with the lovely community. we must try!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PookyRoadMapSection;
