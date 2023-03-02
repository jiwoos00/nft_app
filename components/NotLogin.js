import {useRouter} from "next/router";

export default function NotLogin({ isLogin, setIsLogin, connectKaikas}){
    const router=useRouter();
    
    const KaikasLogin=()=>{
        setIsLogin(!isLogin);
        connectKaikas();

        router.push("/");
    };


    return (
        <>
            <section className="not-section">
                <div className="container-not">
                    <div className="btn-try">
                        <div className="logout">
                            <h5>Please connect account address first</h5>
                            <button type="submit" onClick={KaikasLogin}>Kaikas Login</button>
                            <button type="submit">Klip Login</button>
                        </div>
                    
                    </div>
                </div>   
                <style jsx>{`
                    /** Start NotLogin Css **/
                    .not-section {
                        height: 50vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    
                    .not-section .container-not {
                        width: 1290px;
                        margin: auto;
                        max-width: 95%;
                    }
                    
                  
                    .not-section .btn-try {
                        display: flex;
                        flex-direction: column;
                        text-align : center;
                        
                    }
                    
                    .not-section .btn-try button {
                        font-family: inherit;
                        padding: 10px 30px;
                        background-color: transparent;
                        outline: none;
                        border: 1px solid #525FFB;
                        font-weight: bold;
                        font-size: 20px;
                        letter-spacing: 0.05em;
                        line-height: 27px;
                        text-align: left;
                        color: #525ffb;
                        border-radius: 40px;
                        cursor: pointer;
                        margin-right: 17px;
                        margin-top : 17px;
                    }
                    
                    .not-section h5 {
                        width: 500px;
                        max-width: 95%;
                        font-weight: 350;
                        font-size: 27px;
                        line-height: 35px;
                        text-align: center;
                        color: #0c135e;
                        margin: auto;
                    }
                `}</style>    
            </section>  
        </>    
    );
}

