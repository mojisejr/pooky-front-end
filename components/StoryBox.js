import Image from "next/image";
function StoryBox({ image, children, rotate }) {
  return (
    <div className="story-container">
      <div className="story-box flex md:flex-row flex-col md:gap-3 md:justify-between justify-center items-center">
        <div
          className="story-img md:w-full w-24 hidden md:flex rounded-xl overflow-hidden border-8 border-gray-200  shadow-lg"
          style={{ transform: `rotate(${rotate})` }}
        >
          <Image
            className=" w-full"
            src={image}
            alt="story"
            width={300}
            height={300}
          ></Image>
        </div>
        <div className="story-content md:p-3 p-1 w-full md:text-md text-sm text-white bg-gray-200 bg-opacity-40 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

export default StoryBox;
