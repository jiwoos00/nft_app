import { useRouter } from "next/router";
import Button from "./Button";

export default function NotCaver() {
  const router = useRouter();
  const button = () => {
    router.push(
      "https://chromewebstore.google.com/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
    );
  };
  return (
    <>
      <section className="not-section">
        <div className="container-not">
          <div className="btn-try">
            <div>
              <h5>Please connect kaikas wallet</h5>
              <Button type="button" text={"Kaikas Wallet"} event={button} />
            </div>
          </div>
        </div>
        <style jsx>{`
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
            text-align: center;
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
