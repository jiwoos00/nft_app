import Image from 'next/image';
import { useState } from "react";
import axios from "axios";
import router from 'next/router';
import swal from 'sweetalert';

import data from "../data/service.json";


export default function Service1(){
    const [randomId, setRandomId]=useState("")
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        axios.get('/api/randomTable',{
            params:{randomId:randomId}
        }).then(res=>{
            router.push(`/mynft/${res.data.tokenId[0].tokenId}`)
        }).catch(err=>{
            swal("조회 실패", "해당 코드는 존재하지 않습니다. 다시 확인해 주세요.", "warning");
        })
    }

    return (
        <article>
            <div className="left">
                {data.service1.map(service=>
                    <>
                        <h1>{service.title}</h1>
                        <p>{service.description}</p>
                    </>
                )}
                
                <form onSubmit={handleSubmit}>
                    <input  
                        type="text"
                        value={randomId}
                        onChange={(e)=>setRandomId(e.target.value)}
                        placeholder="공유 코드를 입력해주세요."
                        required
                    />  
                    <button type="submit">조회</button>
                </form>
            </div>


            <div className="right">
                <Image src="/hero.png" width={450} height={450}/>
            </div>

            <style jsx>{`

                article {
                    display:flex;
                }
                .left {
                    display:flex;
                    flex-direction:column;
                    width:60%;
                }

                .left h1 {
                    font-weight:700;
                    font-size:35px;
                    text-align:left;
                }

                .left p {
                    color:#b1aaaa;
                    font-weight:bold;
                    font-size:20px;
                    text-align:left;
                    padding-top:15px;
                }

                form {
                    display:flex;
                    padding-top:40px;
                    align-items:center;
                }

                form input {
                    width:350px;
                    background:transparent;
                    border:1px solid #525FFB;
                    border-radius: 40px;
                    padding:20px 18px;
                    text-align:left;
                    font-size:18px;
                    font-weight:500;
                }

                form button {
                    padding:20px 40px;
                    margin-left:20px;
                    border-radius: 40px;
                    border:none;
                    background:#525FFB;
                    font-weight:500;
                    font-size:18px;
                    text-align:left;
                    color:#fff;
                    cursor:pointer;

                }
                .right {
                    display:flex;
                }
            `}</style>
          
        </article>
    )
}