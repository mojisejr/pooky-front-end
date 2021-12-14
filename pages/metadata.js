function MetadataPage() {
  return <div>Metadata Page is under construction</div>;
}

export default MetadataPage;

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
