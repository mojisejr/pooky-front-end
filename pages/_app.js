import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { MoralisProvider } from "react-moralis";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

const appId = process.env.NEXT_PUBLIC_APP_MORALIS_APPID;
const serverUrl = process.env.NEXT_PUBLIC_APP_MORALIS_SERVERURL;

function getLibrary(provider) {
  const library = new Web3(provider);
  return library;
}

function MyApp({ Component, pageProps }) {
  if (!appId || !serverUrl) throw new Error("invaled serverUrl or AppId");
  return (
    <Layout>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MoralisProvider appId={appId} serverUrl={serverUrl}>
          <Component {...pageProps} />
        </MoralisProvider>
      </Web3ReactProvider>
    </Layout>
  );
}

export default MyApp;
