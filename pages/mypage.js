import * as React from "react";
import axios from "axios";
import Link from "next/link";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Loading from "../components/Loading";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import KIP from "../components/KIP";
import COL from "../components/COL";
import { abi } from "../data/ABI";

function SettingIcon(props) {
  return (
    <SettingsIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SettingsIcon>
  );
}

function VertifiedIcon(props) {
  return (
    <CheckCircleOutlineIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </CheckCircleOutlineIcon>
  );
}
export default function Mypage({ caver, account, newKip17addr }) {
  const [value, setValue] = useState("c");
  const [username, setUsername] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [issuedCertificates, setIssuedCertificates] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (account && newKip17addr) {
      fetchData();
      fetchToken();
    }
  }, [account, newKip17addr]);

  const fetchData = async () => {
    try {
      const userTableResponse = await axios.get("/api/userTable", {
        params: { addr: account },
      });
      setUsername(userTableResponse.data.name);
      setAuth(userTableResponse.data.auth);
    } catch (err) {
      swal("fetchData error", err.message, "warning");
    }
  };

  const fetchToken = async () => {
    try {
      const tokenContract = new caver.klay.Contract(abi.abi, newKip17addr);

      const [tokenIds, issuedTokenIds] = await Promise.all([
        tokenContract.methods.getCertificatesByOwner(account).call(),
        tokenContract.methods.getCertificatesByIssuer(account).call(),
      ]);

      const certificatePromises = tokenIds.map(async (tokenId) => {
        const certificate = await tokenContract.methods
          .getCertificate(tokenId)
          .call();
        return certificate;
      });

      const issuedCertificatePromises = issuedTokenIds.map(async (tokenId) => {
        const certificate = await tokenContract.methods
          .getCertificate(tokenId)
          .call();
        return certificate;
      });

      const [certificates, issuedCertificates] = await Promise.all([
        Promise.all(certificatePromises),
        Promise.all(issuedCertificatePromises),
      ]);

      setCertificates(certificates);
      setIssuedCertificates(issuedCertificates);
    } catch (error) {
      swal("saveMyToken error", error.message, "warning");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mypage-profile">
            <div className="mypage-username">
              <span className="mypage-username-text">{username}</span>
              {auth && <VertifiedIcon fontSize="small" color="primary" />}
            </div>

            <div className="mypage-info">
              <CopyToClipboard
                text={account}
                onCopy={() => swal("Complete copy", "", "success")}
              >
                <div className="mypage-info-copy">{account}</div>
              </CopyToClipboard>

              <Link href="/settings">
                <SettingIcon
                  color="action"
                  fontSize="large"
                  className="mypage-setting"
                />
              </Link>
            </div>
          </div>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Certificates Dashboard" value="c" />
                  <Tab label="My Certificates" value="a" />
                </TabList>
              </Box>

              <TabPanel value="c">
                <div className="mypage-panel">
                  <COL
                    certificates={certificates}
                    issuedCertificates={issuedCertificates}
                  />
                </div>
              </TabPanel>

              <TabPanel value="a">
                <div className="mypage-panel">
                  <KIP certificates={certificates} />
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </>
      )}
    </article>
  );
}
