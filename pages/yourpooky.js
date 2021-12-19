import Head from "next/head";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";
import { abi, address } from "../smartcontract/abi";
import testabi from "../smartcontract/abi.json";

function YourPookyPage() {
  const { account, chainId, authenticate, enableWeb3 } = useMoralis();
  const { Web3API, native } = useMoralisWeb3Api();
  const [myPooky, setMyPooky] = useState([]);
  const [selectedPooky, setSelectPooky] = useState(null);

  async function connect() {
    if (!account) {
      await authenticate();
      enableWeb3();
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
    const response = result.map(async (token) => {
      const metadata = await getMetadata(token.token_id);
      return {
        tokenId: token.token_id,
        tokenUri: token.token_uri,
        pookyName: metadata.name || "no name",
        pookyDesc: metadata.description || "no description",
      };
    });
    let results = await Promise.all(response);
    setMyPooky(results);
  }

  async function getMetadata(tokenId) {
    try {
      const result = await native.runContractFunction({
        chain: chainId,
        address,
        abi: testabi,
        function_name: "pookyInfo",
        params: { tokenId: +tokenId },
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  return (
    <div>
      <Head>
        <title>Your Pooky NFT</title>
      </Head>
      <div>{WalletConnector({ account, chainId, connect })}</div>
      <div className="w-screen flex justify-center">
        <div className="card-container">
          <div className="image-container">
            <div className="pooky-image"></div>
          </div>
          <div className="pooky-name"></div>
          <div className="pooky-description"></div>
          <div className="pooky-percent"></div>
        </div>
      </div>
    </div>
  );
}

function WalletConnector({ account, chainId, connect }) {
  return (
    <>
      {account ? (
        <div>connected account: {account}</div>
      ) : (
        <div>
          {chainId == "0x61" || chainId == "0x38" ? (
            <div>
              <button onClick={connect}>Connect Wallet</button>
            </div>
          ) : (
            <div>
              you are connecting to the wrong chain. please change to Binance
              smart chain
            </div>
          )}
        </div>
      )}
    </>
  );
}

function PookySelector({ myPooky = [], setSelectedPooky }) {
  return (
    <>
      {myPooky.length > 0 ? (
        <div>
          <select onChange={(e) => setSelectedPooky(e.target.value)}>
            <option>- select your pooky -</option>
            {myPooky.map(({ tokenId, pookyName }) => (
              <option key={tokenId} value={tokenId}>
                #{tokenId} | {pookyName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>No Pooky Available</div>
      )}
    </>
  );
}

export default YourPookyPage;

// import { useWeb3React } from "@web3-react/core";

// function MetadataPage() {
//   const { active, activate, library, account, chainId } = useWeb3React();
//   const [isBNB, setIsBNB] = useState(false);
//   const [contract, setContract] = useState(undefined);

//   async function connect() {
//     try {
//       await activate(injected);
//     } catch (e) {
//       alert(`error: ${e.message}`);
//     }
//   }

//   useEffect(() => {
//     if (chainId !== undefined && library) {
//       if (chainId === 97 || chainId === 56) {
//         setIsBNB(true);
//         const contract = new library.eth.Contract(abi, address);
//         setContract(contract);
//       } else {
//         setIsBNB(false);
//         setContract(undefined);
//       }
//     } else {
//       setIsBNB(false);
//       setContract(undefined);
//     }
//   }, [active, chainId, library]);

//   return <div>metadata page</div>;
// }

// export default MetadataPage;
