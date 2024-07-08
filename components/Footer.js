import Image from "next/image";
import Link from "next/link";
import data from "../data/service.json";

export default function Footer() {
  return (
    <>
      {data.footer.map((service, index) => (
        <div className="footer-div" key={index}>
          <Link href="/">
            <Image src={service.logo} alt="" width={100} height={55} />
          </Link>
          <h5>{service.number}</h5>
          <h5>{service.service}</h5>
          <h5 style={{ color: '#525ffb' }}><a href={service.auth}>Authentication Document Form</a></h5>
          <h5>{service.footer}</h5>
        </div>
      ))}
    </>
  );
}
