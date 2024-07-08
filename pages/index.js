import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import router from "next/router";
import swal from "sweetalert";
import data from "../data/service.json";
import Button from "../components/Button";

export default function Home({}) {
  const [randomId, setRandomId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get("/api/randomTable", {
        params: { randomId: randomId },
      })
      .then((res) => {
        router.push(`/mynft/${res.data.tokenId[0].tokenId}`);
      })
      .catch((err) => {
        swal(
          "Inquiry failed",
          "This code does not exist, please check again.",
          "warning"
        );
      });
  };

  return (
    <article className="main-article">
      <div className="main-left">
        {data.service1.map((service, index) => (
          <div key={index}>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="main-left-form">
          <input
            className="main-left-input"
            type="text"
            value={randomId}
            onChange={(e) => setRandomId(e.target.value.trim())}
            placeholder="Please enter the shared code."
            required
          />
          <Button type="submit" text="Retrieve" className="dark" />
        </form>
      </div>

      <div>
        <Image src="/main.png" alt="" width={400} height={400} />
      </div>
    </article>
  );
}
