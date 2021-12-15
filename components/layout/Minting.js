import mintingImage from "../../images/MintingImage.PNG";
import mintingBtnImage from "../../images/MintBtn1.PNG";
import logoImage from "../../images/pooky-logo.PNG";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connector/injected";
import { useEffect, useState } from "react";
import { abi, address } from "../../smartcontract/abi";

function Minting() {
  const maxMintingPerTx = 3;
  const mintState = {
    READY: "READY",
    MINTING: "MINTING",
    ERROR: "ERROR",
  };

  const [isBNB, setIsBNB] = useState(false);
  const [contract, setContract] = useState(undefined);
  const [pookyToMint, setPookyToMint] = useState(0);
  const [mintStatus, setMintStatus] = useState(mintState.READY);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { active, activate, library, account, chainId } = useWeb3React();

  //connect to metamask wallet
  async function connect() {
    try {
      await activate(injected);
    } catch (e) {
      alert(`error: ${e.message}`);
    }
  }

  //get pooky price from smart contract
  async function getPookyPrice() {
    const price = await contract.methods.getPrice().call();
    return price;
  }

  //smart contract internal mint function
  async function _mintPooky(BNB, num) {
    const tx = await contract.methods.getPooky(num).send({
      from: account,
      value: library.utils.toWei(BNB.toString(), "wei"),
    });
    return tx.status;
  }

  //public mint function
  async function mintPooky() {
    if (pookyToMint <= 0) {
      alert("how many pooky do you want to mint !?");
      return;
    }
    const price = await getPookyPrice();
    if (mintStatus == mintState.READY) {
      if (pookyToMint > maxMintingPerTx) {
        alert("only 3 token per transaction!");
      } else {
        const totalPrice = price * +pookyToMint;
        setMintStatus(mintState.MINTING);
        try {
          const result = await _mintPooky(totalPrice, pookyToMint);
          if (!result) {
            setMintStatus(mintState.ERROR);
            setPookyToMint(null);
          }
          setMintStatus(mintState.READY);
        } catch (e) {
          setMintStatus(mintState.READY);
        }
      }
    }
  }

  //countdown timer
  function calculateTimeLeft() {
    let future = new Date("Dec 25, 2021 08:30:00 GMT+0700");
    let difference = +future - +new Date();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  //check if all web3 lib is ready to use
  useEffect(() => {
    if (chainId !== undefined && library) {
      if (chainId === 97 || chainId === 56) {
        setIsBNB(true);
        const contract = new library.eth.Contract(abi, address);
        setContract(contract);
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
      {timerComponents.length > 0 ? (
        <Countdown timerComponents={timerComponents} />
      ) : (
        <div>
          {account ? (
            <div>
              {isBNB ? (
                <MintingSection
                  account={account}
                  mintPooky={mintPooky}
                  setPookyToMint={setPookyToMint}
                  mintState={mintState}
                  mintStatus={mintStatus}
                />
              ) : (
                <WrongChain />
              )}
            </div>
          ) : (
            <WalletConnectSection connect={connect} />
          )}
        </div>
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

function MintingSection({
  account,
  mintPooky,
  setPookyToMint,
  mintStatus,
  mintState,
}) {
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
          <input
            className="p-5 bg-blue-100 text-2xl text-center rounded-2xl border-b-4 border-pink-200"
            type="number"
            placeholder="max 10 pooky"
            onChange={(e) => setPookyToMint(e.target.value)}
            max={10}
          ></input>
          {mintStatus == mintState.READY ? (
            <button onClick={mintPooky}>
              <div className="w-72">
                <Image src={mintingBtnImage} alt="minting btn" />
                {/* Coming Soon... !! */}
              </div>
            </button>
          ) : (
            <div className="text-4xl animate-bounce">Loading</div>
          )}
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

function Countdown({ timerComponents }) {
  return (
    <div className="flex flex-col w-full items-center gap-10">
      <div className="text-3xl">Public sale will be live in..</div>
      <div className="text-6xl bg-gradient-to-tr from-pink-300 to-purple-400 bg-clip-text text-transparent">
        {timerComponents}
      </div>
      <div className="text-sm">
        <ul>
          <li>* get discount from our artist forever.</li>
          <li>* dynamic metadata NFT !</li>
          <li>* be part of animal charity donation.</li>
          <li>* build a strong thailand community driven NFT.</li>
          <li>* have fun with BNB giveaway until the last minting!</li>
        </ul>
      </div>
    </div>
  );
}

export default Minting;
