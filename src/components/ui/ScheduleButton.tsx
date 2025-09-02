import { useRef } from 'react';

import gsap from 'gsap';

interface ScheduleButtonProps {
    title: string;
    canRender: boolean;
}

export const ScheduleButton: React.FC<ScheduleButtonProps> = ({ title, canRender }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // useGSAP(() => {
    //     if (canRender) {
    //         gsap.to(buttonRef.current, {
    //             y: 0,
    //             duration: 1,
    //             ease: "power2.inOut"
    //         });
    //     }
    // },[canRender]);

        return (
            <button
                ref={buttonRef}
                className=
                'w-[139px] h-[46px] bg-accent uppercase text-text-light rounded-[4px] font-baikal-condensed text-[12px] border border-solid border-1 border-accent hover:bg-white hover:text-accent translate-y-[80px] transition-all duration-300'
            >
                {title}
            </button>
        )
    }
