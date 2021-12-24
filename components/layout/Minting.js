import logoImage from "../../images/pooky-logo.PNG";
import Image from "next/image";
import Countdown from "../Countdown";
import WrongChain from "../WrongChain";
import MintingSection from "../MintingSection";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connector/injected";
import { useEffect, useState } from "react";
import { abi, address } from "../../smartcontract/abi";

function Minting() {
  const maxMintingPerTx = 10;
  const mintState = {
    READY: "READY",
    MINTING: "MINTING",
    ERROR: "ERROR",
  };

  const [isBNB, setIsBNB] = useState(false);
  const [contract, setContract] = useState(undefined);
  const [pookyToMint, setPookyToMint] = useState(null);
  const [mintStatus, setMintStatus] = useState(mintState.READY);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { active, activate, library, account, chainId } = useWeb3React();
  const test = useWeb3React();

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
        setPookyToMint(null);
        alert(`only 10 token per transaction!`);
      } else {
        const totalPrice = price * +pookyToMint;
        setMintStatus(mintState.MINTING);
        try {
          const result = await _mintPooky(totalPrice, pookyToMint);
          if (!result) {
            setMintStatus(mintState.ERROR);
            setPookyToMint(null);
          }
          setPookyToMint(null);
          setMintStatus(mintState.READY);
        } catch (e) {
          setMintStatus(mintState.READY);
          setPookyToMint(null);
        }
      }
    }
  }

  //check if all web3 lib is ready to use
  useEffect(() => {
    console.log("chainId", chainId);
    if (chainId !== undefined && library) {
      if (chainId == 80001) {
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

  //countdown timer
  function calculateTimeLeft() {
    // let future = new Date("Dec 28, 2021 20:00:00 GMT+0700");
    let future = new Date("Dec 20, 2021 21:20:00 GMT+0700");
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

  return (
    <div className="section minting-section w-screen bg-gray-100 flex flex-col items-center pt-20">
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
                  pookyToMint={pookyToMint}
                  mintState={mintState}
                  mintStatus={mintStatus}
                />
              ) : (
                <WrongChain />
              )}
            </div>
          ) : (
            <div>
              <WalletConnectSection connect={connect} />
            </div>
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
        please check if you are connecting with Polygon [Matic] Mainnet.
      </div>
    </div>
  );
}

export default Minting;
