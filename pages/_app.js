import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
  const library = new Web3(provider);
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </Layout>
  );
}

export default MyApp;
