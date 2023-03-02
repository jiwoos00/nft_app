import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from "next/router";


export default function Nav ( {connectKaikas, isLogin, setIsLogin}) {
    const router=useRouter();

    function kaikasLoginButton(){
        connectKaikas();
        setIsLogin(!isLogin);   
        router.push("/");
    };

    return (
        <div className='nav'> 
            <div className="logo">
                <Link href="/">
                    <Image src="/logo.png" width={165} height={65} />
                </Link>
            </div>

            <div className="btn">
                <Link href="/upload">
                    <button>Upload</button>
                </Link>
                    
                <Link href="/mypage">
                    <button>MyPage</button>
                </Link>
                {
                    isLogin? (
                        <button className="logout" onClick={kaikasLoginButton}>
                            Logout
                        </button>
                    ):(
                        <button className="login" onClick={kaikasLoginButton}>
                            Login
                        </button>
                    )
                }  
            </div>
            <style jsx>{`
                .nav {
                    background-color: #ffffffde;
                    display: flex;
                    justify-content: space-between;
                    position: fixed;
                    z-index: 1;
                    width: 100%;
                    padding: 30px 50px 20px 70px;
                }

                .nav .logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width:30%;
                }

                .nav .btn {
                    display: flex;
                    justify-content: right;
                    width:50%;
                }

                .nav .btn button {
                    font-weight: bold;
                    font-size: 20px;
                    background-color: transparent;
                    color: #525ffb;
                    border: 1px solid #525FFB;
                    padding: 10px 30px;
                    border-radius: 40px;
                    margin:17px 17px 0px 0px;
                    cursor: pointer;
                }
                .nav .btn .logout {
                    background-color:#c7d6e0;
                }
            `}</style>
        
        </div>
    );
}
