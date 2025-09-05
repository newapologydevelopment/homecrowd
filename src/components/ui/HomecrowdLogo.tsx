import { useGSAP } from "@gsap/react";
import Image from "next/image"
import { useRef } from "react";
import gsap from "gsap";

interface HomecrowdLogoProps {
    canRender?: boolean;
    variant?: 'light' | 'dark';
    hidden?: boolean;
}

export const HomecrowdLogo: React.FC<HomecrowdLogoProps> = ({ canRender, variant = 'dark', hidden = false }) => {
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (canRender) {
            gsap.to(logoRef.current, {
                y: 0,
                duration: 1.5,
                ease: "sine.out"
            });
        }
    }, [canRender]);

    return (
        <div
            className={`w-[135px] h-[20px] relative translate-y-[-80px] transition-opacity duration-300 ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            ref={logoRef}
        >
            <Image
                fill
                src={variant === 'light' ? '/images/homecrowd-logo-white.svg' : '/images/homecrowd-logo.svg'}
                alt="Homecrowd Logo"
                sizes="135px"
                priority
            />
        </div>
    )
}
