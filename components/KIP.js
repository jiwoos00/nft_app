import Link from "next/link"


export default function KIP({nftlist}){

    return (
        <div className='token'>
            {nftlist.map((token)=>{
                return (
                    <Link href={`/mynft/${token.tokenId}`}>
                        <div key={token.tokenId} className='token_div'>
                            <img
                                src={token.photo[2]}
                                alt={token.tokenId}
                                style={{width:"100%", height:"80%", objectFit:"fill", 
                                    borderTopRightRadius:"inherit", borderTopLeftRadius:"inherit"}}
                            />
                            <div className='token_text'>
                                <div className='option'>
                                    { (token.photo[1]==1)?(<>교외상장</>):(<>교내상장</>) } 
                                </div>
                                <div className='title'>{token.photo[3]}</div>
                                        
                            </div>
                        </div>
                    </Link>
                )
            })}
            <style jsx>{`
                .token {
                    display:grid;
                    grid-template-columns: repeat(3,1fr);
                    grid-template-rows:repeat(auto-fill,minmax(1fr,auto));
                    margin:auto;
                    align-items:center;  
                }
                .token_div {
                    background: rgb(250, 251, 252);
                    text-align: center;
                    border-radius: 15px;
                    margin: 1rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                }
                .token_div img {
                    border-radius: 15px 15px 0px 0px;
                }
                .token_div:hover {
                    cursor: pointer;
                    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                }
                .token_text {
                    margin:0.5em;                
                }
                .token_text .option {
                    font-size:14px;
                    color:grey;
                }
                .token_text .title {
                    font-size:20px;
                    font-weight:500;
                    color:black;
                }
            `}</style>
        </div>
    );
}
