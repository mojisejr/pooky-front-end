import Image from "next/image";
function StoryBox({ image, children, rotate }) {
  return (
    <div className="story-container">
      <div className="story-box flex gap-3 justify-between">
        <div className="story-img" style={{ transform: `rotate(${rotate})` }}>
          <Image
            className="rounded-xl w-full"
            src={image}
            alt="story"
            width={300}
            height={300}
          ></Image>
        </div>
        <div className="story-content p-5 w-full">{children}</div>
      </div>
    </div>
  );
}

export default StoryBox;
