import Image from 'next/image';
import Link from 'next/link';
import data from '../data/service.json';


export default function Footer(){
    return (
        <div>
            {data.footer.map(service=>
                <>
                    <Link href="/"><Image src={service.logo} width={100} height={55} /></Link>
                    <h5>{service.number}</h5>
                    <a><h5>{service.service}</h5></a>
                    <h5>{service.footer}</h5>
                </>
            )}

            <style jsx>{`
            
                div {
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    font-size: 20px;
                    line-height: 28px;  
                }
            
            `}</style>
        </div>
    );
}