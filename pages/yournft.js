import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Menu from "../components/Menu";
import Image from "next/image";
import Head from "next/head";
import pookyLogo from "../images/Logo.png";
import { abi, address } from "../smartcontract/abi";
import { useEffect, useState } from "react";
import "../styles/yournft.module.css";

function MetadataPage() {
  const { authenticate, enableWeb3, account, chainId } = useMoralis();
  const { Web3API, native } = useMoralisWeb3Api();
  const [myPooky, setMyPooky] = useState([]);
  const [selectedPooky, setSelectedPooky] = useState({});
  const [newName, setNewName] = useState(null);
  const [newDesc, setNewDesc] = useState(null);

  async function connect() {
    try {
      await authenticate();
      enableWeb3();
    } catch (e) {
      throw new Error(e);
    }
  }

  useEffect(() => {
    console.log(selectedPooky);
  }, [selectedPooky]);

  useEffect(() => {
    if (account) {
      getAllNft();
    }
  }, [account]);

  async function getAllNft() {
    const { result } = await Web3API.account.getNFTsForContract({
      token_address: address,
      chain: "bsc testnet",
    });

    let results = result.map(async (token) => {
      const metadata = await getPookyMetadata(token.token_id);
      return {
        tokenId: token.token_id,
        tokenUri: token.token_uri,
        pookyName: metadata.name || "no name",
        pookyDesc: metadata.description || "no description",
      };
    });

    results = await Promise.all(results);
    setMyPooky(results);
  }

  async function getPookyMetadata(tokenId) {
    try {
      const response = await native.runContractFunction({
        chain: "bsc testnet",
        address,
        abi,
        function_name: "pookyInfo",
        params: { tokenId: +tokenId },
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async function setMetadata(tokenId, name, desc) {
    try {
      const response = await native.runContractFunction({
        chain: chainId,
        address,
        abi,
        function_name: "setPookyMetadata",
        params: { tokenId: tokenId, _newName: name, _newDescription: desc },
      });
      console.log(response);
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-blue-200 to-pink-200 pb-10 main-container flex flex-col">
      <Head>
        <title>Your Pooky</title>
      </Head>
      <div className="flex justify-between p-5 items-center">
        <div className="logo-box w-80 md:flex md:flex-col hidden p-5">
          <Image src={pookyLogo} alt="pooky logo" />
        </div>
        <div>
          <Menu />
        </div>
      </div>
      <div className="self-center">
        {WalletConnectButton({ connect })}
        <div className="m-auto bg-gray-200 p-10 rounded-2xl shadow-2xl bg-opacity-60">
          {PookySelector({ myPooky, setSelectedPooky: setSelectedPooky })}
          <div className="flex flex-col justify-center items-center gap-2">
            <input
              type="text"
              value={selectedPooky.pookyName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <textarea
              value={selectedPooky.pookyDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
          </div>
          <button
            onClick={() => setMetadata(selectedPooky.tokenId, newName, newDesc)}
            className="bg-red-200"
          >
            updateMetadata
          </button>
        </div>
      </div>
    </div>
  );
}

function PookySelector({ myPooky = [], setSelectedPooky }) {
  return (
    <>
      <select
        onChange={(e) => {
          if (e.target.value == "") {
            return;
          }
          const parsedData = myPooky.find(
            (pooky) => pooky.tokenId == e.target.value
          );
          setSelectedPooky(parsedData);
        }}
      >
        <option value="">- select your pooky -</option>
        {myPooky.map((pooky) => (
          <option key={pooky.tokenId} value={pooky.tokenId}>
            #{pooky.tokenId} | {pooky.pookyName}
          </option>
        ))}
      </select>
    </>
  );
}

function WalletConnectButton({ connect }) {
  return (
    <div className="wallet-conntect-container">
      <button
        onClick={connect}
        className="connect-wallet-btn text-4xl bg-gray-200 bg-opacity-40 backdrop-blur-2 pt-5 pb-5 pl-10 pr-10 rounded-xl shadow-sm hover:shadow-2xl hover:text-pink-500 transition-all"
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default MetadataPage;
