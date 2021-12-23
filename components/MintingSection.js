import Image from "next/image";
import mintingImage from "../images/Placeholder.gif";
import cloud1 from "../images/Cloud1.PNG";
import cloud2 from "../images/Cloud2.PNG";
import star from "../images/Star1.PNG";
import loading from "../images/Loading.gif";
function MintingSection({
  account,
  mintPooky = "",
  setPookyToMint,
  pookyToMint,
  mintStatus,
  mintState,
}) {
  return (
    <div>
      <div className="flex flex-col items-center gap-2 -mt-10 pb-10 ">
        <h1 className="mint-title text-6xl text-blue-900 text-center ">
          Mint Pooky Puppy
        </h1>
        <div className="text-xl text-blue-400">connected to: {account}</div>
      </div>

      <div className="mint-wrapper flex items-center justify-center gap-10 p-5 relative">
        <div className="absolute w-72 -right-10 -top-20 z-20">
          <Image src={cloud1} alt="Cloud Image" />
        </div>
        <div className="absolute -top-20">
          <div className="absolute w-72">
            <Image src={cloud2} alt="Cloud Image" />
          </div>
          <div className="absolute w-28 top-12 left-5">
            <Image src={star} alt="Star Image" />
          </div>
        </div>

        <div className="absolute w-24 right-0 top-3 z-20">
          <Image src={star} alt="Star Image" />
        </div>

        <div className="mint-image-box">
          <Image
            src={mintingImage}
            alt="Minting Image"
            width={450}
            height={450}
          />
        </div>
        <div className="mint-box flex flex-col p-5 gap-10 justify-center items-center">
          {mintStatus == mintState.READY ? (
            <div className="flex flex-col items-center gap-10">
              <input
                className="p-5 bg-yellow-200 text-3xl text-center rounded-2xl border-b-4 border-yellow-400 text-blue-400 z-10 outline-none"
                type="number"
                placeholder="- Quantity -"
                value={pookyToMint || ""}
                onChange={(e) => setPookyToMint(e.target.value)}
                max={10}
              ></input>
              <button onClick={mintPooky}>
                <div className="minting-btn">
                  {/* <Image src={mintingBtnImage} alt="minting btn" /> */}
                  {/* Coming Soon... !! */}
                </div>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-10 w-72">
              <Image src={loading} alt="loading" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MintingSection;
