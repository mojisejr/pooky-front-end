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

  async function connect() {
    try {
      await authenticate();
      enableWeb3();
    } catch (e) {
      throw new Error(e);
    }
  }

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
    console.log(results);
    setMyPooky(results);
  }

  async function getPookyMetadata(tokenId) {
    try {
      const response = await native.runContractFunction({
        chain: chainId,
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
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <div className="w-screen bg-gradient-to-tr from-blue-200 to-pink-200 pb-10">
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
      <div className="w-screen">
        <div className="grid grid-cols-3 mr-40 ml-40 gap-20">
          {myPooky.length > 0 ? (
            myPooky.map((pooky) => (
              <div key={pooky.tokenId}>
                <div className="p-10 box-shadow-2xl bg-gray-200 bg-opacity-40 shadow-2xl rounded-xl">
                  <div>id: {pooky.tokenId}</div>
                  <div>name: {pooky.pookyName}</div>
                  <div>desc: {pooky.pookyDesc}</div>
                </div>
              </div>
            ))
          ) : (
            <div>loading..</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MetadataPage;
