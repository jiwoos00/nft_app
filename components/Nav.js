import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";

export default function Nav({ caver, connectKaikas, account }) {
  const router = useRouter();

  function handleLoginButtonClick() {
    connectKaikas();
    router.push("/");
  }

  return (
    <div className="nav">
      <div className="nav-logo">
        <Link href="/">
          <Image src="/logo.png" alt="" width="165" height="65" />
        </Link>
      </div>

      <div className="nav-btn">
        <Link href="/upload">
          <Button text="Upload" />
        </Link>

        <Link href="/mypage">
          <Button text="MyPage" />
        </Link>

        {caver !== null && (
          <Button
            text={account ? "Logout" : "Login"}
            event={handleLoginButtonClick}
            className={account ? "logout" : ""}
          />
        )}
      </div>
    </div>
  );
}
