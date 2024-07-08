import Link from "next/link";

export default function KIP({ certificates }) {
  return (
    <div className="kip-main">
      {certificates.map((token, index) => {
        return (
          <Link href={`/mynft/${token[0]}`} key={index}>
            <div key={token[0]} className="kip-div">
              <img
                src={`http://127.0.0.1:8080/ipfs/${token[1]}`}
                alt={token[0]}
                style={{
                  width: "100%",
                  height: "80%",
                  objectFit: "fill",
                  borderTopRightRadius: "inherit",
                  borderTopLeftRadius: "inherit",
                }}
              />
              <div className="kip-text">
                <div className="kip-text-sub">
                  <>{token[3]}</>
                </div>

                <div className="kip-text-title">{token[2]}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
