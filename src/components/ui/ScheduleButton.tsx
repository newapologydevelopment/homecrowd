import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

interface ScheduleButtonProps {
    title: string;
    canRender: boolean;
    link?: string;
}

export const ScheduleButton: React.FC<ScheduleButtonProps> = ({ title, canRender = false, link='#' }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        if (canRender) {
            gsap.to(buttonRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "sine.out"
            });
        }
    }, [canRender]);

    return (
        <Link href={link} target='_blank'>
            <button
                ref={buttonRef}
                className=
                'w-[139px] h-[46px] bg-accent uppercase text-text-light rounded-[4px] font-baikal-condensed text-[12px] border border-solid border-1 border-accent hover:bg-white hover:text-accent translate-y-[80px] transition-color duration-300 opacity-0'
            >
                {title}
            </button>
        </Link>
    )
}
