import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { abi } from "../../data/ABI";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import InputIcon from "@mui/icons-material/Input";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Loading from "../../components/Loading";

function VertifiedIcon(props) {
  return (
    <CheckCircleOutlineIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </CheckCircleOutlineIcon>
  );
}

function DownloadIcon(props) {
  return (
    <SystemUpdateAltIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SystemUpdateAltIcon>
  );
}

function OutputIcon(props) {
  return (
    <InputIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </InputIcon>
  );
}

export default function Post({ account, newKip17addr }) {
  const router = useRouter();
  const { id } = router.query;
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [issuer, setIssuer] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");

  const [username, setUsername] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detailInfo();
    // transactionInfo(); // rpc error
  }, [account]);

  const detailInfo = async () => {
    try {
      const tokenContract = new caver.klay.Contract(abi.abi, newKip17addr);

      const token = await tokenContract.methods.getCertificate(id).call();

      if (token[0] == "0") {
        router.push("/_error");
        return;
      }

      setUrl("http://127.0.0.1:8080/ipfs/" + token[1]);
      setDesc(token[2]);
      setCategory(token[3]);
      setDate(token[4]);
      setRecipient(token[5]);
      setIssuer(token[6]);

      setLoading(false);
    } catch (error) {
      console.log(error);
      swal("detailInfo error", "", "warning");
    }

    await axios
      .get("/api/userTable", {
        params: { addr: account },
      })
      .then((res) => {
        setUsername(res.data.name);
        setAuth(res.data.auth);
      })
      .catch((err) => {
        throw err;
      });
  };

  const transactionInfo = async () => {
    const events = await tokenContract.getPastEvents("Transfer", {
      filter: {
        tokenId: id,
      },
      fromBlock: 0,
      toBlock: "latest",
    });

    const transactionHashes = events.map((event) => event.transactionHash);
    setTransactionHash(transactionHashes);
  };

  const random = async (e) => {
    function generateUID() {
      var sw = "SW-";
      var firstPart = (Math.random() * 46656) | 0;
      var secondPart = (Math.random() * 46656) | 0;
      firstPart = ("000" + firstPart.toString(36)).slice(-3);
      secondPart = ("000" + secondPart.toString(36)).slice(-3);
      return sw + firstPart + secondPart;
    }

    const random_code = generateUID();
    swal(
      "Shared Code: " + random_code,
      "Copy that code and look it up on the main page.",
      "success"
    );

    await axios.post("/api/randomTable", {
      random: random_code,
      tokenId: Number(id),
    });
  };
  return (
    <article>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="detail-main">
            <div className="detail-left-main">
              <div key={id} className="detail-img">
                <img src={url} width="100%" height="100%" />
              </div>
            </div>

            <div className="detail-right-main">
              {account.toUpperCase() == recipient.toUpperCase() ? (
                <div className="detail-right-btns">
                  <a href={url} download target="_blank">
                    <DownloadIcon
                      fontSize="large"
                      className="detail-right-icon"
                    />
                  </a>
                  <OutputIcon
                    fontSize="large"
                    onClick={random}
                    className="detail-right-icon"
                  />
                </div>
              ) : (
                <></>
              )}

              <div className="detail-right-info">
                <div className="detail-right-info-top">
                  <p className="detail-right-info-sub">{category}</p>
                  <p className="detail-right-info-title">{desc}</p>
                </div>

                <div className="detail-right-info-content">
                  {auth ? (
                    <div className="detail-content">
                      <label>
                        · Issuer{" "}
                        <VertifiedIcon fontSize="large" color="primary" />
                      </label>

                      <a
                        className="text-blue address"
                        href={`https://baobab.scope.klaytn.com/account/${issuer}`}
                        target="_blank"
                      >
                        {username}
                      </a>
                    </div>
                  ) : (
                    <div className="detail-content">
                      <label>· Issuer</label>
                      <a
                        className="text-blue address"
                        href={`https://baobab.scope.klaytn.com/account/${issuer}`}
                        target="_blank"
                      >
                        {issuer}
                      </a>
                    </div>
                  )}

                  <div className="detail-content">
                    <label>· Recipient</label>
                    <a
                      className="text-blue address"
                      href={`https://baobab.scope.klaytn.com/account/${recipient}`}
                      target="_blank"
                    >
                      {recipient}
                    </a>
                  </div>

                  <div className="detail-content">
                    <label>· Date</label>
                    <p className="detail-content-date">{date}</p>
                  </div>
                  {transactionHash ? (
                    <div className="detail-content">
                      <label>
                        <VertifiedIcon fontSize="large" color="primary" />
                        <span>Transaction Hash</span>
                      </label>
                      <a
                        className="text-blue address"
                        href={`https://baobab.klaytnscope.com/tx/${transactionHash}`}
                        target="_blank"
                      >
                        {transactionHash}
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
