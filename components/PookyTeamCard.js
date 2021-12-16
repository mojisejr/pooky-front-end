import Image from "next/image";
function PookyTeamCard({ image, name, profile }) {
  return (
    <div className="card flex flex-col justify-center items-center p-10 md:bg-pink-100 md:bg-opacity-40 md:backdrop-blur-lg">
      <div className="w-24 md:w-full md:text-center">
        <Image
          className="rounded-full"
          src={image}
          alt="Founder Avatar"
          width={200}
          height={200}
        ></Image>
      </div>
      <div className="md:p-10 text-pink-500 text-center">
        <div className="text-xl">{name}</div>
        <div className="text-black">{profile}</div>
      </div>
    </div>
  );
}

export default PookyTeamCard;
