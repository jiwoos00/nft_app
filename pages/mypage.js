import * as React from 'react';
import axios from "axios";
import Image from 'next/image';
import Link from 'next/link';
import KIP from '../components/KIP';
import COL from '../components/COL'

import { useState, useEffect } from "react";
import { nfts } from '../components/MyNFTs';
import { CopyToClipboard } from "react-copy-to-clipboard";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



export default function mypage({ caver, account, newKip17addr }) {
  const [value, setValue] = React.useState('1'); 
  const [username, setUsername] = useState([]); 
  const [auth, setAuth]=useState(false); 
  
  const [nftlist, setNftlist]=useState([]);
  const [nftlist_0, setNftlist_0]=useState([]);
  const [nftlist_1, setNftlist_1]=useState([]);
  
  
  const handleChange = (event= React.SyntheticEvent, newValue= string) => {
    setValue(newValue);
  };

  useEffect(()=>{
    axios.get('/api/userTable',{
      params:{addr:account}
    }).then(res=>{
      setUsername(res.data.ok2) 
      setAuth(res.data.ok3) 
    }).catch(err=>{
      console.log(err)
    });

    saveMyToken();
  },[]);

 
  const saveMyToken=async()=>{
    const tokenContract=await new caver.klay.Contract(nfts.abi, newKip17addr);
    const totalSupply= await tokenContract.methods.totalSupply().call()

    for (let tokenId=1; tokenId<=totalSupply; tokenId++){
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call(); 
      let photo = await tokenContract.methods.tokenData(tokenId).call(); 
      
      if (String(tokenOwner).toLowerCase() === account) {
        setNftlist((prevState) => {
          return [...prevState, { tokenId, photo }];
        })
        if (photo[1]==0){
          setNftlist_0((prevState) => {
            return [...prevState, { tokenId, photo }];
          })
        }
        if (photo[1]==1){
          setNftlist_1((prevState) => {
            return [...prevState, { tokenId, photo }];
          })
        }

      }
    }
  };

  
  return (
    <article>
      <div className="profile">
        {auth && (
          <p>{username} <Image src="/verified.png" width={20} height={20}/></p>
        )}

        {!auth && (
          <p>{username} </p>
        )}


        <div className="info">
          <CopyToClipboard text={account} title="복사">
            <button className="copy">{account}</button>
          </CopyToClipboard>

          <Link href="/settings">
            <button className='setting'><img src='/setting.png' width="40px"></img></button>
          </Link>  
        </div>
      </div>

      
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="My Collection" value="1" />
              <Tab label="Collected" value="2" />
            </TabList>
          </Box>


          <TabPanel value="1">
            <div className='panel'>
              <COL caver={caver}  account={account} nftlist={nftlist} nftlist_0={nftlist_0} nftlist_1={nftlist_1}/>
            </div>
          </TabPanel>
          
          <TabPanel value="2">
            <div className='panel'>
              <KIP caver={caver}  account={account} nftlist={nftlist} newKip17addr={newKip17addr} />
            </div>
          </TabPanel>
        </TabContext>
      </Box>

      <style jsx>{`
        .profile {
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          margin:30px 0;
          font-weight:800;
          font-size:25px;
        }
        .info {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        .copy {
            border-width:0px 0px 3px 0px;
            background-color:transparent;
            border-color:#2b2b2b96;
            cursor:pointer;
            padding: 5px 30px;
            font-weight:bold;
            font-size:15px;
            letter-spacing: 0.05em;
            color: #525ffb;
        }
        .copy:hover {
            filter: drop-shadow( 5px 5px 5px rgba(133, 133, 133, 0.473));
        }
        .setting {
            border-width:0px 0px 3px 0px;
            padding: 0px 8px;
            background-color: transparent;
            border-color: #2b2b2b96;
            cursor: pointer;
            margin-left: 10px;
        }
        .setting:hover {
            filter: drop-shadow( 5px 5px 5px rgba(133, 133, 133, 0.473));
        }
        .panel {
          display: flex;
          align-items: center;
          justify-content: center;
        }
    `}</style>
  </article>
  );

  
}

