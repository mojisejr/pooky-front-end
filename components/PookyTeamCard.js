import Image from "next/image";
function PookyTeamCard({ image, name, profile }) {
  return (
    <div className="card flex flex-col justify-center items-center p-10 bg-gray-200 bg-opacity-40">
      <Image
        className="rounded-full"
        src={image}
        alt="Founder Avatar"
        width={200}
        height={200}
      ></Image>
      <div className="p-10 text-pink-500 text-center">
        <div className="text-xl">{name}</div>
        <div className="text-black">{profile}</div>
      </div>
    </div>
  );
}

export default PookyTeamCard;
