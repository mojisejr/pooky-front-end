import puppy1 from "../../images/story1.JPG";
import puppy2 from "../../images/story2.JPG";
import puppy3 from "../../images/story3.JPG";
import puppy4 from "../../images/story4.JPG";
import StoryBox from "../StoryBox";
import SectionHeader from "../SectionHeader";
function PookyStorySection() {
  return (
    <div>
      <div className="pooky-story-section section w-screen shadow-2xl">
        <SectionHeader text={"Pooky puppy story"} />
        <div className="story-box grid grid-cols-2 pl-20 pr-20 pt-20 gap-5">
          <StoryBox image={puppy1} rotate={"5deg"}>
            <p>
              In the world that the best thing the dog could be is only the best
              pet for any human.
            </p>
          </StoryBox>
          <StoryBox image={puppy2} rotate={"-5deg"}>
            <p>
              One day.. There is a Pomaranian named Pooky! she has an idea of
              freedom everydog in the world of pet thing .. she heard that in
              Metaverse dog can do thing more than just being as a pet.
            </p>
          </StoryBox>
          <StoryBox image={puppy3} rotate={"-5deg"}>
            <p>
              She gathered all dog in the world. and tell all of them that.
              &quot;We are going to move to the new world now. Where we can
              talk, do anything we love for everyone who love us. to the new
              world to the Pookaverse!&quot;
            </p>
          </StoryBox>
          <StoryBox image={puppy4} rotate={"5deg"}>
            <p>
              And we pooky puppies we have a plan ! here it is! &quot;The
              Pookyverse&quot;. the new world that every pooky will has freedom
              and opportunity to grow and shine together let build it big grow
              it sustainably way!
            </p>
          </StoryBox>
        </div>
      </div>
    </div>
  );
}

export default PookyStorySection;
