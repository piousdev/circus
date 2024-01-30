import { Noticia_Text } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/circus-logo-robot.png";

const noticiaText = Noticia_Text({ subsets: ['latin'], weight: ['400', '700'] });

const LogoContainer = () => {
    return (
        <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image src={Logo} alt={"Circus Logo"} width={50} height={50} />
        </Link>
    );
}

export default LogoContainer;