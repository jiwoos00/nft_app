import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import Button from "../components/Button";
import { useRouter } from "next/router";

export default function settings({ account }) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const submitData = async (e) => {
    e.preventDefault();

    try {
      await axios.put("/api/userTable", {
        username: username,
        useraddr: account,
      });
      swal("It has been changed.", " ", "success");
    } catch (err) {
      throw err;
    } finally {
      setUsername("");
      router.push("/mypage");
    }
  };

  return (
    <article>
      <h1 className="setting-title">Change profile name</h1>

      <form onSubmit={submitData}>
        <label>
          User Name<span className="require"> *</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value.trim())}
          value={username}
          required
        ></input>
        <div className="setting-btn">
          <Button type="submit" text={"change"} className="dark" />
        </div>
      </form>
    </article>
  );
}
