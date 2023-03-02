
import Head from 'next/head';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import NotLogin from '../components/NotLogin';
import '../styles/globals.css'

import Caver from 'caver-js';
import axios from "axios";


export default function App({ Component, pageProps }) {
  const [caver, setCaver]=useState();
  const [account, setAccount]=useState(""); //사용자 주소
  const [isLogin, setIsLogin]=useState(false);
  const newKip17addr="0x9E2a996613B878EcaE19f6825BcF6cee6c97Edd8";
  const router=useRouter();
  

  useEffect(()=>{
    if (typeof window.klaytn!=="undefined"){
      try {
        const caver=new Caver(klaytn);
        setCaver(caver);
      }
      catch(err){
        console.log(err)
      }
    }

    const session=sessionStorage.getItem('wallet')
    if (session){
      setIsLogin(1)
    }
  },[]);


  const connectKaikas = async () =>{
    if (!isLogin){
      const accounts=await klaytn.enable()
      sessionStorage.setItem('wallet',JSON.stringify(accounts))
      setAccount(accounts[0])
      

      axios.post('/api/userTable',{
        addr: accounts[0]
      }).then(res=>{
        console.log(res)
      })
    }
    else {
      sessionStorage.removeItem('wallet')
      setAccount("");
    }
  };

  return (
    <>
      <Head>
        <title>Bertify</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <nav>
        <Nav
          connectKaikas={connectKaikas}
          account={account}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setAccount={setAccount}
        />
      </nav>

      <section>
      {(!isLogin && router.route ==="/")? (
          <Component 
            caver={caver}
            account={account}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            connectKaikas={connectKaikas}
            newKip17addr={newKip17addr}
          />
          ) : isLogin? (
          <Component 
            caver={caver}
            account={account}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            connectKaikas={connectKaikas}
            newKip17addr={newKip17addr}
          />
          ) :(     
            <NotLogin isLogin={isLogin} setIsLogin={setIsLogin} connectKaikas={connectKaikas}/> 
       
        )}
    </section>
        
  
    <footer>
      <Footer />
    </footer>
  
    </>
  );
}

