import Button from "../components/Button";
import Link from "next/link";
import Image from "next/image";

function Error({ statusCode }) {
  return (
    <div className="error-main">
      <div>
        <div>
          <Image src="/main.png" alt="" width={400} height={400} />
        </div>

        <div>
          <Link href="/">
            <Button className="dark" text="Go to MainPage" />
          </Link>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
