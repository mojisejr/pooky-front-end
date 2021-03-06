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
              <div className="z-10">
                <input
                  className="p-5 bg-yellow-200 text-3xl text-center rounded-2xl border-b-4 border-yellow-400 text-blue-400 outline-none"
                  type="number"
                  placeholder="- Quantity -"
                  value={pookyToMint || ""}
                  onChange={(e) => setPookyToMint(e.target.value)}
                  max={10}
                ></input>
                <div className="text-indigo-700 text-right pr-5">
                  9 MATIC(~0.005ETH) per NFT.
                </div>
              </div>
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
