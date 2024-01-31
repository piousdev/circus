import Logo from "@/public/circus-logo-robot.png";
import { Noticia_Text } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const noticiaText = Noticia_Text({ subsets: ['latin'], weight: ['400', '700'] });

const LogoContainer = () => {
    return (
        <Link className="flex items-center space-x-2" href="/">
            <Image src={Logo} alt={"Circus Logo"} width={50} height={50} />
        </Link>
    );
}

export default LogoContainer;