import axios from "axios";
import Image from "next/image";
import swal from 'sweetalert';
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {nfts} from '../../components/MyNFTs';

import {format, formatDistanceToNow} from 'date-fns';


export default function Post ({account, newKip17addr}){
    const router=useRouter();
    const {id}=router.query;

    const [title, setTitle]=useState([]);
    const [desc, setDesc]=useState([]);
    const [opt, setOpt]=useState([]);
    const [from, setFrom]=useState([]);
    const [owner, setOwner]=useState([]);
    const [date, setDate]=useState([]);
    const [issueDate, setIssueDate]=useState([]);
    const [url, setUrl]=useState([]);

    const [username, setUsername] = useState([]);
    const [auth, setAuth]=useState(false);

    const [randomCode, setRandomCode]=useState([]);

    const from_url = "https://baobab.scope.klaytn.com/account/" + from
    const to_url = "https://baobab.scope.klaytn.com/account/" + owner

 
    const set=async()=>{
        const tokenContract=await new caver.klay.Contract(nfts.abi, newKip17addr);
        const photo=await tokenContract.methods.tokenData(id).call();
        const owner= await tokenContract.methods.ownerOf(id).call();
        
        setOpt(photo[1]);
        setTitle(photo[3]);
        setDesc(photo[4]);
        setUrl(photo[2]);
        setFrom(photo[0]);
        setOwner(owner);
        setDate(photo[5]);
   
        const date=new Date(photo[6]*1000)
        setIssueDate(format(date, 'yyyy.MM.dd'))
        
        
        axios.get('/api/userTable',{
          params:{addr: account }
        }).then(res=>{
          setUsername(res.data.ok2) 
          setAuth(res.data.ok3) 
        }).catch(err=>{
          console.log(err.res)
        });
    }

    useEffect(()=>{
        set();
    },[]);

  
    const random=(e)=>{
        function generateUID() {
            var sw= "SW-"; 
            var firstPart = (Math.random() * 46656) | 0;
            var secondPart = (Math.random() * 46656) | 0;
            firstPart = ("000" + firstPart.toString(36)).slice(-3);
            secondPart = ("000" + secondPart.toString(36)).slice(-3);
            return sw + firstPart + secondPart;
        }

        const random_code= generateUID()
        swal("공유 코드: " + random_code, "해당 코드를 복사한 후 메인화면에서 조회하세요.", "success");
        axios.post('/api/randomTable',{
            random:random_code,
            tokenId:Number(id), 
        }).then(res=>{
            setRandomCode(res.data.random)
        })
    }

    

    return (
        <div className="main">
            
            <div className='left_main'>
                <div key={id} className='left_img'>
                    <img src={url} width='100%' height='100%'/>
                </div>
            </div>


            <div className='right_main'>
                <div className="buttons">
                    <a href={url} download target="_blank">
                        <button className='right_btn'>
                            <img src="/download.png" width="30px" title="증명서 파일"/>
                        </button>
                    </a>
                    <button className='right_btn' onClick={random}>
                        <img src="/share.png" title="증명서 공유" width="30px"/>
                    </button>
                </div>
                
                
                <div className='right_info'>
                    <div className='right_top'>
                        <div className='right_col'>
                                    { (opt==1)?(<>교외상장</>):(<>교내상장</>) } 
                                </div>
                        <h2 className='right_title'>{title} #{id}</h2>
                    </div>

                    <div className='right_mid'>
                        <h4>· 발급기관 </h4>
                        <a href={from_url} download target="_blank" >
                            { auth===true ? (
                            <div className='auth'>
                                {username} <Image title="인증된 사용자" src="/verified.png" width={20} height={20} />          
                            </div>
                            ):(
                                <>{from}</>
                            )}
                        </a>

                        <br/>
                        &nbsp;

                        <h4>· 수령인 </h4>
                        <a href={to_url}  download target="_blank">{owner}</a> 
                        
                        <br/>
                        &nbsp;

                        <h4>· 발급일자</h4>
                        {issueDate}

                        <br/>
                        &nbsp;

                        <h4>· 수상날짜</h4>
                        {date}

                        <br/>
                        &nbsp;

                        <h4>· 내용</h4>
                        {desc}

                    </div>
                </div>
            </div>
                


        <style jsx>{`
      
            .main {
                display:flex;
                width:95%
                margin:auto;
                margin-top:150px;
                align-items:center;
                flex-direction:row;
            }
            .left_main {
               display:flex;
               flex-direction:column;
               width:50%;

            }
            .left_img {
                width: 90%;
                height:50vh;
                background: rgb(250, 251, 252);
                border-radius: 15px;
                margin: 1rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            }
            .left_img img {
                border-radius: 15px;
                margin-top:auto;
            }
            .left_info {
                width: 90%;
                background: rgb(250, 251, 252);
                border-radius: 15px;
                margin: 1rem;
                padding:1rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            }
            .right_main{
                display:flex;
                flex-direction:column;
                width:50%;
            }
            .buttons {
                text-align:right;
                margin:0 2rem;
            }
            .right_btn {
                background-color: transparent;
                border:none;
                cursor: pointer;
                margin-left:5px;
            }
            .right_info {
                width: 90%;
                background: rgb(250, 251, 252);
                border-radius: 15px;
                margin: 1rem;
                padding:1rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            }
            .right_top {
                align-items:center;
                text-align:center;
                padding-bottom:10px;
                border-bottom:1px solid rgba(73, 72, 72, 0.374);  
            }
            .right_col {
                color:grey;
            }
            .right_mid {
                padding:15px 10px;
            }
    
            .auth {
                color:blue;
            }
            .right_end {
                width: 90%;
                background: rgb(250, 251, 252);
                border-radius: 15px;
                margin: 1rem;
                padding:1rem;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            }
            .right_send {
                padding:10px 0px;
            }
            .right_send input {
                padding: 5px 20px;
                background-color: transparent;
                border: 1px solid #525FFB;
                margin:5px;
                text-align: left;
                border-radius: 40px;
                cursor: pointer;
                color: #525ffb;
            }
            .right_sendbtn button{
                outline:none;
                background-color: transparent;
                border: 1px solid #525FFB;
                text-align: left;
                color: #525ffb;
                border-radius: 40px;
                cursor: pointer;
                padding: 5px 20px;

            }
            
        `}</style>
        </div>
    );
    
};
    

    
