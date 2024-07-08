import { useState } from "react";
import KIP from "../components/KIP";
import Button from "./Button";

export default function COL({ certificates, issuedCertificates }) {
  const [click, setClick] = useState(false);
  const [opt, setOpt] = useState(0);

  const prevBtn = () => {
    setClick(false);
  };

  return !click ? (
    <div className="col-main">
      <div
        className="col-div"
        onClick={() => {
          setClick(true);
          setOpt(0);
        }}
      >
        <div className="col-info">Received Certificates</div>
      </div>

      <div
        className="col-div"
        onClick={() => {
          setClick(true);
          setOpt(1);
        }}
      >
        <div className="col-info">Issued Certificates</div>
      </div>
    </div>
  ) : (
    <>
      {opt === 0 ? (
        <KIP certificates={certificates} />
      ) : (
        <KIP certificates={issuedCertificates} />
      )}
      <div className="col-prev">
        <Button type="button" text="prev" className="dark" event={prevBtn} />
      </div>
    </>
  );
}
