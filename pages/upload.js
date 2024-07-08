import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import swal from "sweetalert";
import Button from "../components/Button";
import { abi } from "../data/ABI";
import { create } from "ipfs-http-client";

export default function upload({ caver, account, newKip17addr }) {
  const [fileUrl, updateFileUrl] = useState("");
  const [category, setCategory] = useState("in-school");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    formatDate();
  }, []);

  const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    setDate(`${year}-${month}-${day}`);
  };

  const check = () => {
    if (fileUrl && category && desc && date && to) {
      return true;
    }
    return false;
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onChange = async (e) => {
    const file = e.target.files[0];
    setImage(window.URL.createObjectURL(file));

    const ipfs = create({ host: "127.0.0.1", port: "5001", protocol: "http" });
    try {
      const added = await ipfs.add(file);
      updateFileUrl(added.path);
    } catch (error) {
      swal("ipfs error", " ", "warning");
    }
  };

  const createNFT = async () => {
    if (!check()) {
      swal("Please enter all required items.", " ", "warning");
      return;
    }
    const tokenContract = await new caver.klay.Contract(abi.abi, newKip17addr);

    try {
      await tokenContract.methods
        .issueCertificate(fileUrl, desc, category, date, to)
        .send({
          from: account,
          gas: "200000000",
        });
      swal("Issuance has been completed.", " ", "success");
      resetForm();
    } catch (error) {
      swal("transfer error " + error, " ", "warning");
    }
  };

  const resetForm = () => {
    setTo("");
    updateFileUrl("");
    setImage("");
    setDesc("");
    setCategory("in-school");
  };

  return (
    <article>
      <h1 className="upload-title">Issue</h1>
      <p className="upload-title">
        <span className="require">* </span> required
      </p>

      <form>
        <div className="upload-div">
          <label>
            Certificate Image <span className="require">*</span>
          </label>

          <div className="upload-file">
            <label htmlFor="fileInput">
              {image ? <img src={image} alt="preview" /> : <p>No Image</p>}
            </label>
            <input type="file" id="fileInput" onChange={onChange} />
          </div>
        </div>

        <div className="upload-div">
          <label>
            Description<span className="require"> *</span>
          </label>

          <TextField
            required
            label="Certificate details"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            fullWidth
          />
        </div>

        <div className="upload-div">
          <FormControl>
            <label>
              Category<span className="require"> *</span>
            </label>
            <RadioGroup value={category} onChange={handleCategoryChange}>
              <FormControlLabel
                value="in-school"
                control={<Radio />}
                label="in-school"
              />
              <FormControlLabel
                value="suburban"
                control={<Radio />}
                label="suburban"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="upload-div">
          <label>
            Recipient<span className="require"> *</span>
          </label>

          <TextField
            required
            value={to}
            label="Recipient's addr"
            onChange={(e) => {
              setTo(e.target.value);
            }}
            fullWidth
          />
        </div>

        <div className="upload-div">
          <label>
            Date<span className="require"> *</span>
          </label>

          <TextField
            value={date}
            InputProps={{
              readOnly: true,
            }}
            label="Date"
            fullWidth
          />
        </div>
      </form>

      <div className="upload-submit">
        <Button type="submit" text={"Issue"} event={createNFT} />
      </div>
    </article>
  );
}
