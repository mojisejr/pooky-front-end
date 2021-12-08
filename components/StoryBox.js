import Image from "next/image";
function StoryBox({ image, children, rotate }) {
  return (
    <div className="story-container">
      <div className="story-box flex md:flex-row flex-col md:gap-3 md:justify-between justify-center items-center">
        <div
          className="story-img md:w-full w-24 md:block hidden"
          style={{ transform: `rotate(${rotate})` }}
        >
          <Image
            className="rounded-xl w-full"
            src={image}
            alt="story"
            width={300}
            height={300}
          ></Image>
        </div>
        <div className="story-content md:p-5 p-1 w-full md:text-md text-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

export default StoryBox;
