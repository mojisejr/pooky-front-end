import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Menu from "../components/Menu";
import Image from "next/image";
import Head from "next/head";
import pookyLogo from "../images/Logo.png";
import imgLoading from "../images/Loading.gif";
import { abi, address } from "../smartcontract/abi";
import { useEffect, useState } from "react";
import * as Base64 from "base-64";
import "../styles/yournft.module.css";

function MetadataPage() {
  const UPDATE_META_STATE = {
    LOADING: "loading",
    READY: "ready",
    UPDATING: "updating",
    SUCCESS: "success",
    ERROR: "error",
  };

  const NFT_DATA_STATE = {
    LOADING: "loading",
    READY: "ready",
    ERROR: "error",
  };

  const { authenticate, enableWeb3, account, web3, isWeb3Enabled } =
    useMoralis();
  const { Web3API, native } = useMoralisWeb3Api();
  const [myPooky, setMyPooky] = useState([]);
  const [selectedPooky, setSelectedPooky] = useState({});
  const [contract, setContract] = useState(null);
  const [updatingMetadataState, setUpdateMetadata] = useState(
    UPDATE_META_STATE.READY
  );
  const [nftDataState, setNftDataState] = useState(NFT_DATA_STATE.LOADING);
  const [nftReveal, setReveal] = useState(false);
  const [signRequest, setSignRequest] = useState(false);

  async function connect() {
    try {
      await authenticate();
      await enableWeb3();
      setSignRequest(true);
      setNftDataState(NFT_DATA_STATE.READY);
    } catch (e) {
      throw new Error(e);
    }
  }

  useEffect(() => {
    if (!signRequest) {
      connect();
      setSignRequest(true);
    }
  }, []);

  useEffect(() => {
    if (account) {
      isReveal();
      if (nftReveal) {
        getAllNft();
      }
    }
  }, [account, selectedPooky, nftReveal]);

  useEffect(() => {
    if (isWeb3Enabled) {
      authenticate();
      const contract = new web3.eth.Contract(abi, address);
      if (contract != undefined) {
        setContract(contract);
        setUpdateMetadata(UPDATE_META_STATE.READY);
      }
    }
  }, [isWeb3Enabled]);

  async function getAllNft() {
    setNftDataState(NFT_DATA_STATE.LOADING);
    const nftOption = {
      chain: "polygon",
      token_address: address,
    };
    const { result } = await Web3API.account.getNFTsForContract(nftOption);

    let results = result.map(async (token) => {
      const metadata = await getTokenURI(token.token_id);
      return {
        tokenId: token.token_id,
        image: metadata.image,
        str: metadata.attributes[0].value,
        vit: metadata.attributes[1].value,
        agi: metadata.attributes[2].value,
        wis: metadata.attributes[3].value,
        birthday: metadata.attributes[4].value,
        discount: metadata.attributes[5].value,
        pookyName: metadata.name || `pooky#${token.token_id}.pooky`,
        pookyDesc: metadata.description || "no description",
      };
    });

    results = await Promise.all(results);
    setMyPooky(results);
    setNftDataState(NFT_DATA_STATE.READY);
  }

  async function getTokenURI(tokenId) {
    try {
      const jsonBase64 = await native.runContractFunction({
        chain: "polygon",
        address,
        abi,
        function_name: "tokenURI",
        params: { tokenId: tokenId },
      });
      const decodedJSON = JSON.parse(Base64.decode(jsonBase64.split(",")[1]));
      return decodedJSON;
    } catch (e) {
      throw new Error(e);
    }
  }

  async function isReveal() {
    const reveal = await native.runContractFunction({
      chain: "polygon",
      address,
      abi,
      function_name: "isReveal",
    });
    reveal ? setReveal(true) : setReveal(false);
  }

  async function updateMetadata(e) {
    e.preventDefault();
    const { pookyIdSelector, name, description } = e.target;
    if (pookyIdSelector.value && name.value && description.value) {
      setUpdateMetadata(UPDATE_META_STATE.READY);
    }
    if (updatingMetadataState == UPDATE_META_STATE.READY) {
      try {
        setUpdateMetadata(UPDATE_META_STATE.UPDATING);
        const tx = await contract.methods
          .setPookyMetadata(
            pookyIdSelector.value,
            name.value,
            description.value
          )
          .send({ from: account });
        if (tx.status) {
          setSelectedPooky({});
          setUpdateMetadata(UPDATE_META_STATE.SUCCESS);
          await getAllNft();
        } else {
          setUpdateMetadata(UPDATE_META_STATE.ERROR);
        }
      } catch (e) {
        setUpdateMetadata(UPDATE_META_STATE.ERROR);
      }
    } else {
      setUpdateMetadata(UPDATE_META_STATE.ERROR);
    }
  }

  async function getPookyStatus(tokenId) {
    setUpdateMetadata(UPDATE_META_STATE.LOADING);
    try {
      const tx = await contract.methods
        .getStatusForPooky(tokenId)
        .send({ from: account });
      if (tx.status == true) {
        setSelectedPooky({});
        setUpdateMetadata(UPDATE_META_STATE.SUCCESS);
        await getAllNft();
      }
    } catch (e) {
      alert("invalid transaction, try again");
      setUpdateMetadata(UPDATE_META_STATE.READY);
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
        {!account ? (
          <>
            {nftDataState != NFT_DATA_STATE.LOADING ? (
              <WalletConnectButton connect={connect} account={account} />
            ) : (
              <LoadingComponent text={"Your Pooky"} />
            )}
          </>
        ) : (
          <div className="m-auto bg-gray-200 p-10 rounded-2xl shadow-2xl bg-opacity-60">
            {updatingMetadataState == UPDATE_META_STATE.UPDATING ? (
              <LoadingComponent text="" />
            ) : (
              <div>
                {nftReveal ? (
                  <div>
                    <div className="mb-4">
                      {selectedPooky.image != undefined ? (
                        <div className="image-box w-full flex items-center justify-between gap-2">
                          <Image
                            placeholder={imgLoading}
                            loading="lazy"
                            src={selectedPooky.image}
                            alt="pookyImage"
                            width={200}
                            height={200}
                          />
                          <div className="token-info self-center pl-4">
                            <div>
                              <span className="text-pink-400">NAME: </span>{" "}
                              {selectedPooky.pookyName}
                            </div>
                            <div>
                              <span className="text-pink-400">BIRTHDAY: </span>
                              {new Date(
                                selectedPooky.birthday * 1000
                              ).toLocaleDateString()}
                            </div>
                            {selectedPooky.str &&
                            selectedPooky.agi &&
                            selectedPooky.vit &&
                            selectedPooky.wis ? (
                              <div>
                                <span className="text-pink-400">
                                  str: {selectedPooky.str}{" "}
                                </span>
                                <span className="text-pink-400">
                                  vit: {selectedPooky.agi}{" "}
                                </span>
                                <span className="text-pink-400">
                                  agi: {selectedPooky.vit}{" "}
                                </span>
                                <span className="text-pink-400">
                                  wis: {selectedPooky.wis}{" "}
                                </span>
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  getPookyStatus(selectedPooky.tokenId)
                                }
                                className="bg-pink-200 p-2 shadow-2xl rounded-xl"
                              >
                                get your status
                              </button>
                            )}
                            <div>
                              <span className="text-pink-400">Discount: </span>
                              {selectedPooky.discount} %
                            </div>

                            <div className="w-56">
                              {selectedPooky.pookyDesc}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <Image
                            src={imgLoading}
                            alt="pookyImage"
                            width={200}
                            height={200}
                          />
                        </div>
                      )}
                    </div>

                    <MetadataChangingForm
                      updateMetadata={updateMetadata}
                      selectedPooky={selectedPooky}
                    >
                      <PookySelector
                        myPooky={myPooky}
                        setSelectedPooky={setSelectedPooky}
                      />
                    </MetadataChangingForm>
                  </div>
                ) : (
                  <NotRevealComponent />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MetadataChangingForm({ updateMetadata, children }) {
  return (
    <form onSubmit={updateMetadata}>
      {children}
      <div className="flex flex-col justify-center gap-1">
        <label htmlFor="name">new Name</label>
        <input
          id="name"
          placeholder="new pooky name"
          className="p-2 rounded-xl"
        />
        <label htmlFor="description">newDescription</label>
        <textarea
          id="description"
          placeholder="new pooky description"
          className="p-2 rounded-xl"
        />
      </div>
      <button
        type="submit"
        className="bg-pink-400 font-bold text-white hover:text-blue-300 transition-all mt-2 pt-2 pb-2 pr-3 pl-3 rounded-xl w-full"
      >
        updateMetadata
      </button>
    </form>
  );
}

function PookySelector({ myPooky = [], setSelectedPooky }) {
  return (
    <>
      <select
        id="pookyIdSelector"
        className="p-2 rounded-xl w-full"
        onChange={(e) => {
          if (e.target.value == "") {
            setSelectedPooky({});
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

function WalletConnectButton({ connect, account }) {
  return (
    <div className="wallet-conntect-container">
      <button
        onClick={connect}
        className="connect-wallet-btn text-4xl bg-gray-200 bg-opacity-40 backdrop-blur-2 pt-5 pb-5 pl-10 pr-10 rounded-xl shadow-sm hover:shadow-2xl hover:text-pink-500 transition-all"
      >
        {account ? <span>{account}</span> : <span>WalletConnect</span>}
      </button>
    </div>
  );
}

function LoadingComponent({ text }) {
  return (
    <div>
      <Image src={imgLoading} alt="pookyImage" width={200} height={200} />
    </div>
  );
}

function NotRevealComponent() {
  return (
    <div className="text-pink-500 flex justify-center items-center flex-col">
      <div className="w-72">
        <Image src={imgLoading} alt="loading" />
      </div>
      <div className="no-reveal-title text-4xl">Revealing Soon ...</div>
    </div>
  );
}

export default MetadataPage;
