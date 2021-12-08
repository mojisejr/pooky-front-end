import HomeSection from "../components/layout/Home";
import PookyRoadMapSection from "../components/layout/PookyRoadMap";
import PookyStorySection from "../components/layout/PookyStory";
import PookyTeamSection from "../components/layout/PookyTeam";
import PookyTokenSection from "../components/layout/PookyToken";
function Home() {
  return (
    <div>
      <HomeSection />
      <PookyStorySection />
      <PookyTokenSection />
      <PookyRoadMapSection />
      <PookyTeamSection />
    </div>
  );
}

export default Home;
