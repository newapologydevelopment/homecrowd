import { useGSAP } from "@gsap/react";
import Image from "next/image"
import { useRef } from "react";
import gsap from "gsap";

interface HomecrowdLogoProps {
    canRender?: boolean;
}

export const HomecrowdLogo: React.FC<HomecrowdLogoProps> = ({ canRender }) => {
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (canRender) {
            gsap.to(logoRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "sine.out"
            });
        }
    }, [canRender]);

    return (
        <div className="w-[135px] h-[20px] relative translate-y-[-80px]" ref={logoRef}>
            <Image
                layout="fill"
                src="/images/homecrowd-logo.svg"
                alt="Homecrowd Logo"
            />
        </div>
    )
}
