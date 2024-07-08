import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import NotLogin from "../components/NotLogin";
import NotCaver from "../components/NotCaver";
import "../styles/globals.css";

import Caver from "caver-js";
import axios from "axios";
import Error from './_error';

export default function App({ Component, pageProps }) {
  const [caver, setCaver] = useState(null);
  const [account, setAccount] = useState(null);
  const newKip17addr = "0x30C947E45fD6Cd4C8de76A9F15b5F8C8EBCB45c1";
  const router = useRouter();
  
  useEffect(() => {
    const enableKlaytn = async () => {
      if (typeof window.klaytn !== "undefined") {
        try {
          const caver = new Caver(klaytn);
          setCaver(caver);
          const accounts = await window.klaytn.enable();
          setAccount(accounts[0]);
        } catch (error) {
          throw error;
        }
      } else {
        console.error("Klaytn object not found");
      }
    };

    enableKlaytn();

    if (window.klaytn) {
      klaytn.on("accountsChanged", handleAccountsChanged);
      klaytn.on("networkChanged", handleNetworkChanged);
      klaytn.on("disconnected", handleDisconnected);
    }

    return () => {
      if (window.klaytn) {
        window.klaytn.removeListener("accountsChanged", handleAccountsChanged);
        window.klaytn.removeListener("networkChanged", handleNetworkChanged);
        window.klaytn.removeListener("disconnected", handleDisconnected);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    setAccount(accounts[0] || null);
    router.push("/");
  };

  const handleNetworkChanged = (networkId) => {
    setAccount(null);
    router.push("/");
  };

  const handleDisconnected = () => {
    setAccount(null);
    router.push("/");
  };

  const connectKaikas = async () => {
    if (caver && !account) {
      try {
        const accounts = await klaytn.enable();
        setAccount(accounts[0]);

        await axios.post("/api/userTable", { addr: accounts[0] });
      } catch (error) {
        throw error;
      }
    } else {
      setAccount(null);
    }
  };

  const renderContent = () => {
    if (!caver && router.route !== "/") return <NotCaver />;
    if (!account && router.route !== "/")
      return <NotLogin connectKaikas={connectKaikas} />;

    return (
      <Component
        caver={caver}
        account={account}
        setAccount={setAccount}
        connectKaikas={connectKaikas}
        newKip17addr={newKip17addr}
      />
    );
  };

  if (Component === Error) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>Bertify</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Nav caver={caver} connectKaikas={connectKaikas} account={account} />

      <section>{renderContent()}</section>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
