import mintingImage from "../../images/MintingImage.PNG";
import mintingBtnImage from "../../images/MintBtn1.PNG";
import logoImage from "../../images/pooky-logo.png";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connector/injected";
import { useEffect, useState } from "react";
import { abi, address } from "../../smartcontract/abi";

function Minting() {
  const [isBNB, setIsBNB] = useState(false);
  const [contract, setContract] = useState(undefined);
  const [pookyToMint, setPookyToMint] = useState(0);
  const { active, activate, library, account, chainId } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (e) {
      alert(`error: ${e.message}`);
    }
  }

  async function mintPooky() {}

  useEffect(() => {
    if (chainId !== undefined && library) {
      if (chainId === 97 || chainId === 56) {
        setIsBNB(true);
        // const contract = new library.eth.Contract(abi, address);
        // setContract(contract);
      } else {
        setIsBNB(false);
        setContract(undefined);
      }
    } else {
      setIsBNB(false);
      setContract(undefined);
    }
  }, [active, chainId, library]);

  return (
    <div className="section w-screen bg-gray-100 md:shadow-2xl flex flex-col items-center justify-center">
      {account ? (
        <div>
          {isBNB ? (
            <MintingSection
              account={account}
              mintPooky={mintPooky}
              setPookyToMint={setPookyToMint}
            />
          ) : (
            <WrongChain />
          )}
        </div>
      ) : (
        <WalletConnectSection connect={connect} />
      )}
    </div>
  );
}

function WalletConnectSection({ connect }) {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Image
        src={logoImage}
        alt="connect wallet image"
        width={300}
        height={300}
      />
      <button
        className="text-4xl pt-5 pb-5 pl-10 pr-10 rounded-2xl border-b-4 hover:bg-blue-200 hover:text-white hover:border-pink-200"
        onClick={connect}
      >
        Connect Wallet
      </button>
      <div>
        please check if you are connecting with Binance Smart Chain Mainnet.
      </div>
    </div>
  );
}

function MintingSection({ account, mintPooky, setPookyToMint }) {
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="mint-title text-4xl text-blue-900 pt-15 text-center">
          Mint Pooky Puppy
        </h1>
        <div className="text-xl text-blue-400">connected to: {account}</div>
      </div>
      <div className="mint-wrapper flex items-center justify-center gap-10 p-5">
        <div className="mint-image-box">
          <Image
            src={mintingImage}
            alt="Minting Image"
            width={450}
            height={450}
          />
        </div>
        <div className="mint-box flex flex-col p-5 gap-10 justify-center items-center">
          {/* <input
            className="p-5 bg-blue-100 text-2xl text-center rounded-2xl border-b-4 border-pink-200"
            type="number"
            placeholder="max 10 pooky"
            onChange={(e) => setPookyToMint(e.target.value)}
            max={10}
          ></input> */}
          <button>
            <div className="w-72 text-4xl">
              {/* <Image src={mintingBtnImage} alt="minting btn" /> */}
              Coming Soon... !!
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function WrongChain() {
  return (
    <div>
      your wallet is connecting to wrong chain please change and try again!
    </div>
  );
}

export default Minting;
