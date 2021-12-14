import puppy1 from "../../images/story1.JPG";
import puppy2 from "../../images/story2.JPG";
import puppy3 from "../../images/story3.JPG";
import puppy4 from "../../images/story4.JPG";
import StoryBox from "../StoryBox";
import SectionHeader from "../SectionHeader";
import Image from "next/image";
function PookyStorySection() {
  return (
    <div>
      <div className="pooky-story-section section w-screen md:shadow-2xl md:pr-40 md:pl-40">
        <SectionHeader text={"Pooky puppy story"} />
        <div className="md:hidden flex h-24 mt-4">
          <Image src={puppy1} alt="pooky image" width={150} height={150} />
          <Image src={puppy2} alt="pooky image" width={150} height={150} />
          <Image src={puppy3} alt="pooky image" width={150} height={150} />
          <Image src={puppy4} alt="pooky image" width={150} height={150} />
        </div>

        <div className="story-box grid md:grid-cols-2 grid-flow-row  md:pt-20 pt-10 gap-5 p-5">
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
