import HomeSection from "../components/layout/Home";
import Minting from "../components/layout/Minting";
import PookyRoadMapSection from "../components/layout/PookyRoadMap";
import PookyStorySection from "../components/layout/PookyStory";
import PookyTeamSection from "../components/layout/PookyTeam";
import PookyTokenSection from "../components/layout/PookyToken";

function Home() {
  return (
    <div>
      <HomeSection />
      <Minting />
      <PookyStorySection />
      <PookyTokenSection />
      <PookyRoadMapSection />
      <PookyTeamSection />
    </div>
  );
}

export default Home;
