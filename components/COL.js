import KIP from '../components/KIP';
import { useState } from "react";

export default function COL({nftlist_0, nftlist_1}){
    const [click, setClick]=useState(false);
    const [opt, setOpt]=useState();
    
    return (
        (!click)? (
        <div className='col'>
            <div className='col_div' onClick={()=>{setClick(true); setOpt(0)}}>
                <div className='col_info'>교내</div>
            </div>

            <div className='col_div' onClick={()=>{setClick(true); setOpt(1)}}>
                <div className='col_info'>교외</div>
            </div>
          

            <style jsx>{`
                .col {
                    display:flex;
                    width:100%;
                    margin:auto;
                    align-items:center;  
                }
                .col_div {
                    width: 30%;
                    background: rgb(250, 251, 252);
                    border-radius: 15px;
                    margin: 1rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                }
                .col_div:hover {
                    cursor: pointer;
                    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                }
                .col_info {
                    margin:10px;
                    text-align: center;
                    font-size:20px;
                    font-weight:500;
                }
                
            `}</style>
        </div>
        ) :  (
            (opt==0)? (
                <KIP nftlist={nftlist_0} />
            ):(
                <KIP nftlist={nftlist_1}  />
            )
        )
    );
}
